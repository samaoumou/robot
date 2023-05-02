/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';
import { PlantesService } from 'src/plantes/plantes.service';
import { serialService } from 'src/serial/serial.service';

@Injectable()
export class TasksService {
  constructor(
    //private schedulerRegistry: SchedulerRegistry,
    private planteService: PlantesService,
  ) {}

  async applySettings() {
    const plante = await this.planteService.findActive();
    if (!plante) {
      console.error('Schedule not found');
      return;
    }
    const hours = plante[0].heureArrosage.split('/');
    hours.forEach((hour) => {
      const time = 22; //hour.split('h')[0];
      const minute = 26;
      const duration = 10;
      const pompeOnJob = new CronJob(
        `0 ${minute} ${time} * * *`,
        () => {
          serialService.writeToPort('1');
          console.log('Allumage pompe');
        },
        null,
        true,
        'UTC',
      );

      const pompeOffJob = new CronJob(
        `${duration} ${minute} ${time} * * *`,
        () => {
          serialService.writeToPort('0');
          console.log('Extinction pompe');
        },
        null,
        true,
        'UTC',
      );

      pompeOnJob.start();
      pompeOffJob.start();
    });
  }
}
