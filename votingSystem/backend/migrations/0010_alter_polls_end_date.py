# Generated by Django 4.1.7 on 2023-03-11 18:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0009_alter_polls_options'),
    ]

    operations = [
        migrations.AlterField(
            model_name='polls',
            name='end_date',
            field=models.DateTimeField(db_index=True, verbose_name='End Date'),
        ),
    ]