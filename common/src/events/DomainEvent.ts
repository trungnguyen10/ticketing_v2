import { DomainTopic } from './DomainTopic';

export interface DomainEvent {
  topic: DomainTopic;
  payload: any;
}
