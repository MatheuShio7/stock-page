# Generated by Django 5.2 on 2025-04-27 03:54

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("acoes", "0001_initial"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="observacaoacao",
            name="data_criacao",
        ),
    ]
