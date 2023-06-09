# Generated by Django 4.1.7 on 2023-03-11 11:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0006_alter_polls_end_date'),
    ]

    operations = [
        migrations.AlterField(
            model_name='polls',
            name='description',
            field=models.CharField(blank=True, max_length=300),
        ),
        migrations.AlterField(
            model_name='polls',
            name='status',
            field=models.CharField(choices=[('inProgress', 'In Progress'), ('completed', 'Completed'), ('canceled', 'Canceled')], max_length=20),
        ),
    ]
