import { Observable } from 'data/observable';
import { PanGestureEventData } from 'ui/gestures';
import { Page, View } from 'ui/page';
import { PercentLength } from 'tns-core-modules/ui/frame/frame';
import { AnimationCurve } from "ui/enums";

export class MainWorldModel extends Observable {

    private prevDeltaX = 0;
    private prevDeltaY = 0;
    private draggable: View = this.page.getViewById( 'dragBtn' );
    private container: View = this.page.getViewById( 'container' );
    /**
     * A Map to store
     * the last dragged trail
     */
    private dragMap = new Array<{ x: number, y: number }>();

    constructor ( private page: Page ) {
        super();
        this.setInitialPosition();
    }

    private setInitialPosition () {
        this.draggable.translateX = 0;
        this.draggable.translateY = 0;
    }

    public onTap () {
        // something on tap
    }

    public onPan ( args: PanGestureEventData ) {
        console.log( "Pan delta: [" + args.deltaX + ", " + args.deltaY + "] state: " + args.state );

        if ( args.state === 1 ) // down
        {
            this.draggable.animate( {
                scale: { x: 0.6, y: 0.6 }
            } );

            this.prevDeltaX = 0;
            this.prevDeltaY = 0;
        }
        else if ( args.state === 2 ) // panning
        {
            this.dragMap.push( {
                x: args.deltaX,
                y: args.deltaY
            } )

            this.draggable.translateX += ( args.deltaX ) - this.prevDeltaX;
            this.draggable.translateY += ( args.deltaY ) - this.prevDeltaY;
            this.prevDeltaX = args.deltaX;
            this.prevDeltaY = args.deltaY;

            // container dimensions
            const containerWidth = <{ unit: any, value: any }> this.container.width;
            const containerMeasuredWidth = this.container.getMeasuredWidth();
            const containerMeasuredHeight = this.container.getMeasuredHeight();
            console.log( `Container: Width --> ${ containerWidth.value } Measured Width --> ${ containerMeasuredWidth }` )

            // draggable dimensions
            const draggableWidth = <any> this.draggable.width
            const draggableMeasuredWidth = this.draggable.getMeasuredWidth();
            const draggableMeasuredHeight = this.draggable.getMeasuredHeight();
            const convFactor = draggableWidth / draggableMeasuredWidth
            console.log( `Draggable: Width --> ${ draggableWidth } Measured Width --> ${ draggableMeasuredWidth }` )

            let edgeX = ( ( containerMeasuredWidth - draggableMeasuredWidth ) * convFactor ) / 2;
            let edgeY = ( ( containerMeasuredHeight - draggableMeasuredHeight ) * convFactor ) / 2;
            console.log( `Edges: X --> ${ edgeX } Y --> ${ edgeY }` )

            //validate edges
            if ( Math.round( Math.abs( this.draggable.translateX ) ) > edgeX ) {
                this.draggable.translateX = this.draggable.translateX < 0 ? -Math.abs( edgeX ) : edgeX;
            }
            if ( this.draggable.translateY < 0 && Math.round( Math.abs( this.draggable.translateY ) ) > edgeY ) {
                this.draggable.translateY = -Math.abs( edgeY );
            }
        }
        else if ( args.state === 3 ) // up
        {
            console.log( `Translate X --> ${ this.draggable.translateX }, Translate Y --> ${ this.draggable.translateY }` )
            this.draggable.animate( {
                scale: { x: 1, y: 1 }
            } );
        }
    }
}