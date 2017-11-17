import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';

interface Event {
    type: string;
    payload: any;
}

interface ComponentEventSubscription {
    componentName: string;
    subscriptions: Subscription[];
}

type EventCallback = (payload:any) => void;

@Injectable()
export class EventService {

    private handler = new Subject<Event>();

    private componentSubscriptions:ComponentEventSubscription[] = [];

    publish(type:string, payload:any) {
        this.handler.next({type, payload});
    }

    subscribe(type:string, callback:EventCallback):Subscription {
        return this.handler
            .filter(message => message.type === type)
            .map(message => message.payload)
            .subscribe(callback);
    }

    subscribeFor(componentName:string, type:string, callback:EventCallback):ComponentEventSubscription {
        let componentEventSubscription = this.componentSubscriptions.find(cS => cS.componentName == componentName);
        if (!componentEventSubscription) {
            componentEventSubscription = {componentName: componentName, subscriptions: []} as ComponentEventSubscription;
            this.componentSubscriptions.push(componentEventSubscription);
        }
        componentEventSubscription.subscriptions.push(this.subscribe(type, callback));
        return componentEventSubscription;
    }

    unsubscribeAllFor(componentName:string) {
        let componentEventSubscription = this.componentSubscriptions.find(cS => cS.componentName == componentName);
        if (componentEventSubscription) {
            componentEventSubscription.subscriptions.forEach(s => s.unsubscribe());
        }
    }

}