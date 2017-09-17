# Quark

比特币导航站

## 准备工作

- 安装 Python 虚拟环境
- 创建一个虚拟环境
- 安装 python package


### 安装虚拟环境

```bash
pip install virtualenv
pip install virtualenvwrapper
```

### 创建一个虚拟环境
```bash
mkvirtualenv quark
cd /path/to/quark
```

### 安装 python package
```bash
pip install -r requirements.txt 
```

### test
1. in python env , run 

    coverage run ./manage.py test --settings=YOUR_SETTINGS_PATH
    
    coverage report 
    
2. see .coveragerc for config 
    
    
     
    
    