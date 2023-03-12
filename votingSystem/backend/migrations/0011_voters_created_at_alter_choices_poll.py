# Generated by Django 4.1.7 on 2023-03-12 14:23

from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0010_alter_polls_end_date'),
    ]

    operations = [
        migrations.AddField(
            model_name='voters',
            name='created_at',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now, verbose_name='Vote submitted at'),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='choices',
            name='poll',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='choices', to='backend.polls'),
        ),
    ]
