from django.shortcuts import render
from django.urls import reverse_lazy
from django.contrib.auth.mixins import LoginRequiredMixin
from django.views.generic import ListView, DetailView, CreateView, UpdateView, DeleteView

from . import models


class PluginCreateView(LoginRequiredMixin, CreateView):
    model = models.Plugin
    template_name = "plugins_new.html"
    fields = [
            'manufacturer',
            'name',
            'vers',
            'plugin_type',
        ]


class PluginListView(LoginRequiredMixin, ListView):
    model = models.Plugin
    context_object_name = "plugins_list"
    template_name = "plugins_list.html"

    def get_queryset(self):
        return models.Plugin.objects.all().order_by('manufacturer')


class PluginDetailView(LoginRequiredMixin, DetailView):
    model = models.Plugin
    context_object_name = "plugin"
    template_name = "plugins_detail.html"


class PluginUpdateView(LoginRequiredMixin, UpdateView):
    model = models.Plugin
    template_name = "plugins_update.html"
    fields = [
            'manufacturer',
            'name',
            'vers',
            'plugin_type',
        ]


class PluginDeleteView(LoginRequiredMixin, DeleteView):
    model = models.Plugin
    context_object_name = "plugin"
    success_url = reverse_lazy("plugins:plugins_list")
    template_name = "plugins_delete.html"
