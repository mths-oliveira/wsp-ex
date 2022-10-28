import data from "../database/classes.json"
import { Timezone } from "../models/timezone"

interface Classes {
  weekdays: string
  firstClassSchedule: string
  lastClassSchedule: string
}

export class ClassesController {
  findAllClassesInTimeZone(timezone: Timezone): Classes[] {
    return data.classes.map((classes) => {
      const firstClassSchedule = timezone.convertTime(
        classes.firstClassSchedule
      )
      const lastClassSchedule = timezone.convertTime(classes.lastClassSchedule)
      return {
        firstClassSchedule,
        lastClassSchedule,
        weekdays: classes.weekdays,
      }
    })
  }
}
