import { DomainTopic } from '@tnticketingdev/common';

export const resolvePublishAddress = (topic: DomainTopic) =>
  `/exchanges/${topic.toString()}`;
