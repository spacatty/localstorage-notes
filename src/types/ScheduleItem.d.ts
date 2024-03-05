export default interface ScheduleItem {
  id: number;
  title: string;
  place?: string;
  notes?: string;
  date: Date | string;
}
