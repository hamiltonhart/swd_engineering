from django.shortcuts import render, HttpResponseRedirect, reverse
from django.urls import reverse_lazy
from django.views.generic import ListView, DetailView, CreateView, UpdateView, DeleteView
from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.auth.decorators import login_required

from forms.forms import SimpleSearchForm, ContactSortSearchForm
from scripts.search import get_query

from . import models
from .forms import ContactsForm


class ContactCreateView(LoginRequiredMixin, CreateView):
    model = models.Contact
    template_name = "contacts_new.html"
    form_class = ContactsForm
    

@login_required
def contacts_detail(request, pk):
    contact = models.Contact.objects.get(pk=pk)

    if request.method == "POST":
        if "delete_contact" in request.POST:
            contact.delete()
        
            return HttpResponseRedirect(reverse('contacts:contacts_list'))

    context_dict = {
        'contact': contact
    }

    return render(request, 'contacts_detail.html', context=context_dict)


class ContactUpdateView(LoginRequiredMixin, UpdateView):
    model = models.Contact
    template_name = "contacts_update.html"
    context_object_name = "contact"
    form_class = ContactsForm
    

class ContactDeleteView(LoginRequiredMixin, DeleteView):
    model = models.Contact
    template_name = "contacts_delete.html"
    success_url = reverse_lazy("contacts:contacts_list")
    context_object_name = "contact"

@login_required
def contacts_redirect_list_view(request):
    return HttpResponseRedirect(reverse('contacts:contacts_list'))

@login_required
def contacts_list(request):
    """
    Contacts List:
    Lists rental_projects based on sorting selection.
    If search, it is sorted by the sorting selection.
    """

    contacts_list = models.Contact.objects.all().order_by('first_name')
    sorting_search_form = ContactSortSearchForm()
    query_string = None

    # if sort_options == 'first':
    #     filtering = 'first_name'
    #     contacts_list = contacts_list.order_by(filtering)
    # elif sort_options == 'last':
    #     filtering = 'last_name'
    #     contacts_list = contacts_list.order_by(filtering)

    sorting_options = {
        "0": "first_name",
        "1": "last_name"
    }
    
    if request.method == "GET":
        if 'search_filter' in request.GET or 'clear_search' in request.GET:
            sorting = sorting_options[request.GET['name_sorting']]
            print(sorting)
            contacts_list = models.Contact.objects.all().order_by(sorting)
            if request.GET['search_field'] == '':
                sorting_search_form = ContactSortSearchForm(request.GET)
            else:
                query_string = request.GET['search_field']
                query = get_query(
                    query_string, ['first_name', 'last_name',])
                contacts_list = contacts_list.filter(query).order_by(sorting)
                sorting_search_form = ContactSortSearchForm(request.GET)
    
    context_dict = {
        'contacts_list': contacts_list,
        'sorting_search_form': sorting_search_form,
        'results': query_string,
    }

    return render(request, 'contacts_list.html', context_dict)

