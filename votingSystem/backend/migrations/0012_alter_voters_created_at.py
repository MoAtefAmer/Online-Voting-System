# Generated by Django 4.1.7 on 2023-03-12 16:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0011_voters_created_at_alter_choices_poll'),
    ]

    operations = [
        migrations.AlterField(
            model_name='voters',
            name='created_at',
            field=models.DateTimeField(auto_now_add=True),
        ),
    ]
