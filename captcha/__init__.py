import random
import os
from django.http import HttpResponse
from PIL import Image, ImageDraw, ImageFont, ImageFilter
from math import ceil
from io import BytesIO

current_path = os.path.normpath(os.path.dirname(__file__))

words = "ABCEDFGHIJKLMNOPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"


class Captcha(object):

    def __init__(self):
        """ something init
        """
        self.session_key = '_django_captcha_key'
        # self.words = []
        self.words = words
        self._checkcode = ''
        # image size (pix)
        self.img_width = 150
        self.img_height = 40

        # default type
        # self.type = 'number'
        self.type = 'word'

    def _get_font_size(self):
        """  将图片高度的80%作为字体大小
        """
        s1 = int(self.img_height * 0.8)
        s2 = int(self.img_width / len(self.code))
        return int(min((s1, s2)) + max((s1, s2)) * 0.05)

    def _get_words(self):
        """ The words list
        """

        # TODO  扩充单词表

        if self.words:
            return set(self.words)

        file_path = os.path.join(current_path, 'words.list')
        f = open(file_path, 'r')
        return set([line.replace('\n', '') for line in f.readlines()])

    def _set_answer(self, answer):
        """  设置答案

        """
        self._checkcode = str(answer).lower()

    def _get_answer(self):
        return self._checkcode

    # 英文单词验证码
    def word(self):
        code = random.sample(self._get_words(), 4)
        # print (''.join(code))
        self._set_answer(''.join(code))
        return code

    # 数字公式验证码
    def number(self):
        m, n = 1, 50
        x = random.randrange(m, n)
        y = random.randrange(m, n)
        r = random.randrange(0, 3)
        if x < y:
            x, y = y, x
        if r == 0:
            code = "%s - %s = ?" % (x, y)
            z = x - y
        else:
            code = "%s + %s = ?" % (x, y)
            z = x + y
        self._set_answer(z)
        return code

    def _yield_code(self):
        """  生成验证码文字,以及答案
        """
        fun = getattr(self, self.type.lower())
        return fun()

    def _get_font_color(self):
        return (
            random.randrange(
                120, 255), random.randrange(
                120, 255), random.randrange(
                120, 255), random.randrange(
                230, 255)
            )

    def get_fonts(self):
        font_list = list()
        fonts = os.listdir(os.path.join(current_path, 'fonts'))
        font_path = os.path.join(current_path, 'fonts/')
        for font in fonts:
            font_list.append(
                "{font_path}{font}".format(font_path=font_path, font=font)
            )
        return font_list

    def _get_backgroud(self):
        _color =  (
            random.randrange(
                10, 50), random.randrange(
                10, 50), random.randrange(
                10, 50),)
        # print(_color)
        return _color

    def noise_dots(self, draw, im):
        size = im.size
        for p in range(int(size[0] * size[1] * 0.1)):
            draw.point((random.randint(0, size[0]), random.randint(0, size[1])), fill=self._get_font_color())
        return draw

    def display(self):
        """  The captch image output using Django response object
        """
        im = Image.new(
            'RGBA',
            (self.img_width,
             self.img_height),
            self._get_backgroud())
        self.code = self._yield_code()

        # set font size automaticly
        self.font_size = self._get_font_size()
        # creat
        draw = ImageDraw.Draw(im)
        draw = self.noise_dots(draw, im)

        # draw noisy point/line
        if self.type == 'word':
            c = int(6 / len(self.code) * 3) or 3
        elif self.type == 'number':
            c = 6
        else:
            c = 4

        for i in range(random.randrange(c - 2, c)):
            line_color = (
                random.randrange(
                    120, 255), random.randrange(
                    120, 255), random.randrange(
                    120, 255))
            xy = (
                random.randrange(0, int(self.img_width * 0.2)),
                random.randrange(0, self.img_height),
                random.uniform(3 * self.img_width / 4, self.img_width),
                random.randrange(0, self.img_height)
            )
            draw.line(xy, fill=line_color, width=int(self.font_size * 0.1))
            # draw.arc(xy,fill=line_color,width=int(self.font_size*0.1))
        # draw.arc(xy,0,1400,fill=line_color)

        # code part
        j = int(self.font_size * 0.3)
        k = int(self.font_size * 0.5)
        x = random.randrange(j, k)  # starts point
        for i in self.code:
            # 上下抖动量,字数越多,上下抖动越大
            m = int(len(self.code))
            y = random.randrange(1, 3)

            if i in ('+', '-', '*', '=', '?'):
                # 对计算符号等特殊字符放大处理
                m = ceil(self.font_size * 0.8)
            else:
                # 字体大小变化量,字数越少,字体大小变化越多
                m = random.randrange(
                    0, int(45 / self.font_size) + int(self.font_size / 5))

            font_path = random.sample(self.get_fonts(), 1)
            font_path = "".join(font_path)

            self.font = ImageFont.truetype(font_path.replace(
                '\\', '/'), self.font_size + int(ceil(m)))
            draw.text(
                (x, y), i, font=self.font, fill=self._get_font_color())
            x += self.font_size * 0.9

        del x
        del draw
        buf = BytesIO()
        im.filter(ImageFilter.SMOOTH)
        im.save(buf, 'png')
        im.close()
        return HttpResponse(buf.getvalue(), 'image/png')

    def validate(self, code, _checkcode):
        """
        validate user's input
        """
        if not code:
            return False
        return code.lower() == str(_checkcode).lower()

    def check(self, code):
        """
        This function will no longer be supported after  version  0.4
        """

        return self.validate(code)


class Code(Captcha):
    """
    compatibility for less than v2.0.6
    """
    pass

if __name__ == '__main__':
    import mock
    request = mock.Mock()
    c = Captcha(request)
