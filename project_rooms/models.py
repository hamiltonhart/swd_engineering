from django.db import models


class ProjectRoom(models.Model):
    room = models.ForeignKey("rooms.Stage", on_delete=models.CASCADE, related_name="rental_projects", verbose_name="Room")
    project = models.ForeignKey("rental_projects.RentalProject", on_delete=models.CASCADE, related_name="rental_rooms")
    primary_room = models.BooleanField(default=False, verbose_name="Set Primary", blank=True)

    def __str__(self):
        return f'{str(self.project)} - {str(self.room)}'

    class Meta:
        unique_together = (('room', 'project'))
