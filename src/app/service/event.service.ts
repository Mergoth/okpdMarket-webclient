import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {Subscription} from 'rxjs/Subscription';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';

interface Event {
  name: string;
  payload: any;
}

interface ComponentEventSubscription {
  componentName: string;
  subscriptions: Subscription[];
}

type EventCallback = (payload: any) => void;

@Injectable()
export class EventService {

  private handler = new Subject<Event>();

  private componentSubscriptions: ComponentEventSubscription[] = [];

  publish(name: string, payload: any) {
    this.handler.next({name: name, payload});
  }

  private _subscribe(name: string, callback: EventCallback): Subscription {
    return this.handler
      .filter(message => message.name === name)
      .map(message => message.payload)
      .subscribe(callback);
  }

  subscribeFor(componentName: string, name: string, callback: EventCallback): ComponentEventSubscription {
    console.log(`Component name => ${componentName}, name => ${name}`);
    let componentEventSubscription = this.componentSubscriptions.find(cS => cS.componentName === componentName);

    if (!componentEventSubscription) {
      componentEventSubscription = {componentName: componentName, subscriptions: []} as ComponentEventSubscription;
      this.componentSubscriptions.push(componentEventSubscription);
    }

    componentEventSubscription.subscriptions.push(this._subscribe(name, callback));
    return componentEventSubscription;
  }

  unsubscribeAllFor(componentName: string) {
    const componentEventSubscription = this.componentSubscriptions.find(cS => cS.componentName === componentName);
    if (componentEventSubscription) {
      componentEventSubscription.subscriptions.forEach(s => s.unsubscribe());
    }
  }
}
