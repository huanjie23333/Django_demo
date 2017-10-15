from nav.models import Nav, Profile


def run():
    navs = Nav.objects.all()

    for row in navs:
        Profile.objects.create(
            site=row,
            description=row.description,
        )
        # row.profile.description = row.description
        # row.profile.save()
