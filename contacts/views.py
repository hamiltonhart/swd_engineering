from django.shortcuts import render, HttpResponseRedirect, reverse
from django.urls import reverse_lazy
from django.views.generic import ListView, DetailView, CreateView, UpdateView, DeleteView
from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.auth.decorators import login_required

from forms.forms import SimpleSearchForm
from scripts.search import get_query

from . import models
from .forms import ContactsForm


class ContactCreateView(LoginRequiredMixin, CreateView):
    model = models.Contact
    template_name = "contacts_new.html"
    form_class = ContactsForm


# class ContactListView(LoginRequiredMixin, ListView):
#     model = models.Contact
#     template_name = "contacts_list.html"
#     context_object_name = "contacts_list"

#     def get_queryset(self):
#         if self.kwargs["display_options"] == "all":
#             return models.Contact.objects.all().order_by('first_name')


class ContactDetailView(LoginRequiredMixin, DetailView):
    model = models.Contact
    template_name = "contacts_detail.html"
    context_object_name = "contact"


class ContactUpdateView(LoginRequiredMixin, UpdateView):
    model = models.Contact
    template_name = "contacts_update.html"
    context_object_name = "contact"
    form_class = ContactsForm
    

class ContactDeleteView(LoginRequiredMixin, DeleteView):
    model = models.Contact
    template_name = "contacts_delete.html"
    success_url = reverse_lazy("contacts:contacts_list" "first")
    context_object_name = "contact"

@login_required
def contacts_redirect_list_view(request):
    return HttpResponseRedirect(reverse('contacts:contacts_list', kwargs={'sort_options':'first'}))

@login_required
def contacts_list(request, sort_options=None):
    """
    Contacts List:
    Lists rental_projects based on sorting selection.
    If search, it is sorted by the sorting selection.
    """

    contacts_list = models.Contact.objects.all()
    search_form = SimpleSearchForm()
    query_string = None

    if sort_options == 'first':
        filtering = 'first_name'
        contacts_list = contacts_list.order_by(filtering)
    elif sort_options == 'last':
        filtering = 'last_name'
        contacts_list = contacts_list.order_by(filtering)
    
    if request.method == "GET" and 'search_field' in request.GET:
        if request.GET['search_field'] == '':
            search_form = SimpleSearchForm()
        else:
            query_string = request.GET['search_field']
            query = get_query(
                query_string, ['first_name', 'last_name',])
            contacts_list = contacts_list.filter(query).order_by(filtering)
            search_form = SimpleSearchForm()
    
    context_dict = {
        'contacts_list': contacts_list,
        'search_form': search_form,
        'results': query_string,
    }

    return render(request, 'contacts_list.html', context_dict)

