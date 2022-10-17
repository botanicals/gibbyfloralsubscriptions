// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs

import mail from '@sendgrid/mail';
import { Mail } from '@sendgrid/helpers/classes';
import { EmailData as EmailAddress } from '@sendgrid/helpers/classes/email-address';
import { MailContent } from '@sendgrid/helpers/classes/mail';

import { DynamicTemplates, UnsubscribeGroups } from '../utils/maps';

// Set Api Key
mail.setApiKey(process.env.SENDGRID_API_KEY!);

// using Twilio SendGrid's v3 mail send docs
// https://docs.sendgrid.com/api-reference/mail-send/mail-send
// here I am specifying only the fields that I want to use, in addition to
// structuring the data in an easier to manage way
// this interface is extended for dynamic and static emails
interface EmailData {
  to: EmailAddress;
  from: EmailAddress;
  replyTo: EmailAddress;
}

//////////////////// DYNAMIC EMAIL ////////////////////
export interface DynamicEmailData extends EmailData {
  templateId: DynamicTemplates;
  dynamicTemplateData: {
    [key: string]: string | boolean | number;
  };
}

// Here I am taking the custom structured data and restructuring it
// to fit the required format, using helper classes provided by @sendgrid/helpers package
export class DynamicEmail {
  email: Mail;
  error: any;
  response: any;

  constructor(public data: DynamicEmailData) {
    const mail = new Mail(this.data);

    mail.setPersonalizations([
      {
        to: [this.data.to],
        dynamicTemplateData: this.data.dynamicTemplateData /* Allows key/value data to be inserted into a dynamic transactional template ({{data}}) */,
      },
    ]); // Anything specified in personalizations overwrites the default settings provided at the root level of the object (https://docs.sendgrid.com/for-developers/sending-email/personalizations)

    mail.setTemplateId(this.data.templateId); // Overrides any subject and content values specified

    mail.setFrom(this.data.from);
    mail.setReplyTo(this.data.replyTo);

    mail.setAsm({
      groupId: UnsubscribeGroups.OrderUpdates /* The unsubscribe group to associate with this email */,
      groupsToDisplay: [UnsubscribeGroups.OrderUpdates] /* The unsubscribe groups to display on the preferences page */,
    });
    mail.setMailSettings({
      bypassListManagement: {
        enable: true,
      } /* Bypasses all unsubscribe groups and supressions to ensure the email is delivered to the recipient (https://docs.sendgrid.com/ui/sending-email/index-suppressions#bypass-suppressions) */,
    });
    mail.setTrackingSettings({
      clickTracking: { enable: true, enableText: false } /* Tracks if a recipient clicked a link in your email */,
      openTracking: { enable: true } /* Tracks if the email was opened by including a single pixel, and testing if that pixel has been loaded */,
    });

    this.email = mail;
  }

  log(): void {
    console.log('EMAIL', this.email);
  }

  async send(): Promise<boolean> {
    try {
      // @ts-expect-error: https://github.com/sendgrid/sendgrid-nodejs/issues/1057
      const response = await mail.send(this.email);
      this.response = response;
      return true;
    } catch (error: any) {
      this.error = error.response.body;
      return false;
    }
  }
}

//////////////////// STATIC EMAIL ////////////////////

export interface StaticEmailData extends EmailData {
  subject: string;
  content: MailContent[];
  substitutions: {
    [key: string]: string;
  };
}

// Here I am taking the custom structured data and restructuring it
// to fit the required format, using helper classes provided by @sendgrid/helpers package
export class StaticEmail {
  email: Mail;
  error: any;
  response: any;

  constructor(public data: StaticEmailData) {
    const mail = new Mail(this.data);

    mail.setPersonalizations([
      {
        to: [this.data.to],
        substitutions: this.data.substitutions /* Allows key/value data to be inserted into text and html content, subject, and reply-to parameters (%data%) - cannot be used with dynamic templates */,
      },
    ]); // Anything specified in personalizations overwrites the default settings provided at the root level of the object (https://docs.sendgrid.com/for-developers/sending-email/personalizations)

    mail.setContent(this.data.content);

    mail.setFrom(this.data.from);
    mail.setReplyTo(this.data.replyTo);
    mail.setSubject(this.data.subject);

    mail.setAsm({
      groupId: UnsubscribeGroups.OrderUpdates /* The unsubscribe group to associate with this email */,
      groupsToDisplay: [UnsubscribeGroups.OrderUpdates] /* The unsubscribe groups to display on the preferences page */,
    });
    mail.setMailSettings({
      bypassListManagement: {
        enable: true,
      } /* Bypasses all unsubscribe groups and supressions to ensure the email is delivered to the recipient (https://docs.sendgrid.com/ui/sending-email/index-suppressions#bypass-suppressions) */,
    });
    mail.setTrackingSettings({
      clickTracking: { enable: true, enableText: false } /* Tracks if a recipient clicked a link in your email */,
      openTracking: { enable: true } /* Tracks if the email was opened by including a single pixel, and testing if that pixel has been loaded */,
    });

    this.email = mail;
  }

  log(): void {
    console.log('EMAIL', this.email);
  }

  async send(): Promise<boolean> {
    try {
      // @ts-expect-error: https://github.com/sendgrid/sendgrid-nodejs/issues/1057
      const response = await mail.send(this.email);
      this.response = response;
      return true;
    } catch (error: any) {
      this.error = error.response.body;
      return false;
    }
  }
}
