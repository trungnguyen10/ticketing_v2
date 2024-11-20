import { DomainTopic } from '@tnticketingdev/common';

export const resolvePublishAddress = (topic: DomainTopic) =>
  `/exchanges/${topic.toString()}`;

export const resolveSubscribeAddress = (topic: DomainTopic, queue: string) =>
  `/queues/${topic}.${queue}`;
