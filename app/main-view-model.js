"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var observable_1 = require("data/observable");
var MainWorldModel = /** @class */ (function (_super) {
    __extends(MainWorldModel, _super);
    function MainWorldModel(page) {
        var _this = _super.call(this) || this;
        _this.page = page;
        _this.prevDeltaX = 0;
        _this.prevDeltaY = 0;
        _this.draggable = _this.page.getViewById('dragBtn');
        _this.container = _this.page.getViewById('container');
        /**
         * A Map to store
         * the last dragged trail
         */
        _this.dragMap = new Array();
        _this.setInitialPosition();
        return _this;
    }
    MainWorldModel.prototype.setInitialPosition = function () {
        this.draggable.translateX = 0;
        this.draggable.translateY = 0;
    };
    MainWorldModel.prototype.onTap = function () {
        // something on tap
    };
    MainWorldModel.prototype.onPan = function (args) {
        console.log("Pan delta: [" + args.deltaX + ", " + args.deltaY + "] state: " + args.state);
        if (args.state === 1) {
            this.draggable.animate({
                scale: { x: 0.6, y: 0.6 }
            });
            this.prevDeltaX = 0;
            this.prevDeltaY = 0;
        }
        else if (args.state === 2) {
            this.dragMap.push({
                x: args.deltaX,
                y: args.deltaY
            });
            this.draggable.translateX += (args.deltaX) - this.prevDeltaX;
            this.draggable.translateY += (args.deltaY) - this.prevDeltaY;
            this.prevDeltaX = args.deltaX;
            this.prevDeltaY = args.deltaY;
            // container dimensions
            var containerWidth = this.container.width;
            var containerMeasuredWidth = this.container.getMeasuredWidth();
            var containerMeasuredHeight = this.container.getMeasuredHeight();
            console.log("Container: Width --> " + containerWidth.value + " Measured Width --> " + containerMeasuredWidth);
            // draggable dimensions
            var draggableWidth = this.draggable.width;
            var draggableMeasuredWidth = this.draggable.getMeasuredWidth();
            var draggableMeasuredHeight = this.draggable.getMeasuredHeight();
            var convFactor = draggableWidth / draggableMeasuredWidth;
            console.log("Draggable: Width --> " + draggableWidth + " Measured Width --> " + draggableMeasuredWidth);
            var edgeX = ((containerMeasuredWidth - draggableMeasuredWidth) * convFactor) / 2;
            var edgeY = ((containerMeasuredHeight - draggableMeasuredHeight) * convFactor) / 2;
            console.log("Edges: X --> " + edgeX + " Y --> " + edgeY);
            //validate edges
            if (Math.round(Math.abs(this.draggable.translateX)) > edgeX) {
                this.draggable.translateX = this.draggable.translateX < 0 ? -Math.abs(edgeX) : edgeX;
            }
            if (this.draggable.translateY < 0 && Math.round(Math.abs(this.draggable.translateY)) > edgeY) {
                this.draggable.translateY = -Math.abs(edgeY);
            }
        }
        else if (args.state === 3) {
            console.log("Translate X --> " + this.draggable.translateX + ", Translate Y --> " + this.draggable.translateY);
            this.draggable.animate({
                scale: { x: 1, y: 1 }
            });
        }
    };
    return MainWorldModel;
}(observable_1.Observable));
exports.MainWorldModel = MainWorldModel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi12aWV3LW1vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWFpbi12aWV3LW1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsOENBQTZDO0FBTTdDO0lBQW9DLGtDQUFVO0lBWTFDLHdCQUFzQixJQUFVO1FBQWhDLFlBQ0ksaUJBQU8sU0FFVjtRQUhxQixVQUFJLEdBQUosSUFBSSxDQUFNO1FBVnhCLGdCQUFVLEdBQUcsQ0FBQyxDQUFDO1FBQ2YsZ0JBQVUsR0FBRyxDQUFDLENBQUM7UUFDZixlQUFTLEdBQVMsS0FBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUUsU0FBUyxDQUFFLENBQUM7UUFDckQsZUFBUyxHQUFTLEtBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFFLFdBQVcsQ0FBRSxDQUFDO1FBQy9EOzs7V0FHRztRQUNLLGFBQU8sR0FBRyxJQUFJLEtBQUssRUFBNEIsQ0FBQztRQUlwRCxLQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQzs7SUFDOUIsQ0FBQztJQUVPLDJDQUFrQixHQUExQjtRQUNJLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQztRQUM5QixJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUM7SUFDbEMsQ0FBQztJQUVNLDhCQUFLLEdBQVo7UUFDSSxtQkFBbUI7SUFDdkIsQ0FBQztJQUVNLDhCQUFLLEdBQVosVUFBZSxJQUF5QjtRQUNwQyxPQUFPLENBQUMsR0FBRyxDQUFFLGNBQWMsR0FBRyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksR0FBRyxJQUFJLENBQUMsTUFBTSxHQUFHLFdBQVcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFFLENBQUM7UUFFNUYsRUFBRSxDQUFDLENBQUUsSUFBSSxDQUFDLEtBQUssS0FBSyxDQUFFLENBQUMsQ0FDdkIsQ0FBQztZQUNHLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFFO2dCQUNwQixLQUFLLEVBQUUs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LENBQUMsQ0FBQyxDQUFDO2dCQUNqRyxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUUsS0FBSyxDQUFFLENBQUM7WUFDbkQsQ0FBQztRQUNMLENBQUM7UUFDRCxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUUsSUFBSSxDQUFDLEtBQUssS0FBSyxDQUFFLENBQUMsQ0FDNUIsQ0FBQztZQUNHLE9BQU8sQ0FBQyxHQUFHLENBQUUscUJBQW9CLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSwwQkFBdUIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFhLENBQUUsQ0FBQTtZQUMvRyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBRTtnQkFDcEIsS0FBSyxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFO2FBQ3hCLENBQUUsQ0FBQztRQUNSLENBQUM7SUFDTCxDQUFDO0lBQ0wscUJBQUM7QUFBRCxDQUFDLEFBbkZELENBQW9DLHVCQUFVLEdBbUY3QztBQW5GWSx3Q0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdkYXRhL29ic2VydmFibGUnO1xuaW1wb3J0IHsgUGFuR2VzdHVyZUV2ZW50RGF0YSB9IGZyb20gJ3VpL2dlc3R1cmVzJztcbmltcG9ydCB7IFBhZ2UsIFZpZXcgfSBmcm9tICd1aS9wYWdlJztcbmltcG9ydCB7IFBlcmNlbnRMZW5ndGggfSBmcm9tICd0bnMtY29yZS1tb2R1bGVzL3VpL2ZyYW1lL2ZyYW1lJztcbmltcG9ydCB7IEFuaW1hdGlvbkN1cnZlIH0gZnJvbSBcInVpL2VudW1zXCI7XG5cbmV4cG9ydCBjbGFzcyBNYWluV29ybGRNb2RlbCBleHRlbmRzIE9ic2VydmFibGUge1xuXG4gICAgcHJpdmF0ZSBwcmV2RGVsdGFYID0gMDtcbiAgICBwcml2YXRlIHByZXZEZWx0YVkgPSAwO1xuICAgIHByaXZhdGUgZHJhZ2dhYmxlOiBWaWV3ID0gdGhpcy5wYWdlLmdldFZpZXdCeUlkKCAnZHJhZ0J0bicgKTtcbiAgICBwcml2YXRlIGNvbnRhaW5lcjogVmlldyA9IHRoaXMucGFnZS5nZXRWaWV3QnlJZCggJ2NvbnRhaW5lcicgKTtcbiAgICAvKipcbiAgICAgKiBBIE1hcCB0byBzdG9yZVxuICAgICAqIHRoZSBsYXN0IGRyYWdnZWQgdHJhaWxcbiAgICAgKi9cbiAgICBwcml2YXRlIGRyYWdNYXAgPSBuZXcgQXJyYXk8eyB4OiBudW1iZXIsIHk6IG51bWJlciB9PigpO1xuXG4gICAgY29uc3RydWN0b3IgKCBwcml2YXRlIHBhZ2U6IFBhZ2UgKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuc2V0SW5pdGlhbFBvc2l0aW9uKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzZXRJbml0aWFsUG9zaXRpb24gKCkge1xuICAgICAgICB0aGlzLmRyYWdnYWJsZS50cmFuc2xhdGVYID0gMDtcbiAgICAgICAgdGhpcy5kcmFnZ2FibGUudHJhbnNsYXRlWSA9IDA7XG4gICAgfVxuXG4gICAgcHVibGljIG9uVGFwICgpIHtcbiAgICAgICAgLy8gc29tZXRoaW5nIG9uIHRhcFxuICAgIH1cblxuICAgIHB1YmxpYyBvblBhbiAoIGFyZ3M6IFBhbkdlc3R1cmVFdmVudERhdGEgKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCBcIlBhbiBkZWx0YTogW1wiICsgYXJncy5kZWx0YVggKyBcIiwgXCIgKyBhcmdzLmRlbHRhWSArIFwiXSBzdGF0ZTogXCIgKyBhcmdzLnN0YXRlICk7XG5cbiAgICAgICAgaWYgKCBhcmdzLnN0YXRlID09PSAxICkgLy8gZG93blxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLmRyYWdnYWJsZS5hbmltYXRlKCB7XG4gICAgICAgICAgICAgICAgc2NhbGU6IHsgeDogMC42LCB5OiAwLjYgfVxuICAgICAgICAgICAgfSApO1xuXG4gICAgICAgICAgICB0aGlzLnByZXZEZWx0YVggPSAwO1xuICAgICAgICAgICAgdGhpcy5wcmV2RGVsdGFZID0gMDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICggYXJncy5zdGF0ZSA9PT0gMiApIC8vIHBhbm5pbmdcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5kcmFnTWFwLnB1c2goIHtcbiAgICAgICAgICAgICAgICB4OiBhcmdzLmRlbHRhWCxcbiAgICAgICAgICAgICAgICB5OiBhcmdzLmRlbHRhWVxuICAgICAgICAgICAgfSApXG5cbiAgICAgICAgICAgIHRoaXMuZHJhZ2dhYmxlLnRyYW5zbGF0ZVggKz0gKCBhcmdzLmRlbHRhWCApIC0gdGhpcy5wcmV2RGVsdGFYO1xuICAgICAgICAgICAgdGhpcy5kcmFnZ2FibGUudHJhbnNsYXRlWSArPSAoIGFyZ3MuZGVsdGFZICkgLSB0aGlzLnByZXZEZWx0YVk7XG4gICAgICAgICAgICB0aGlzLnByZXZEZWx0YVggPSBhcmdzLmRlbHRhWDtcbiAgICAgICAgICAgIHRoaXMucHJldkRlbHRhWSA9IGFyZ3MuZGVsdGFZO1xuXG4gICAgICAgICAgICAvLyBjb250YWluZXIgZGltZW5zaW9uc1xuICAgICAgICAgICAgY29uc3QgY29udGFpbmVyV2lkdGggPSA8eyB1bml0OiBhbnksIHZhbHVlOiBhbnkgfT4gdGhpcy5jb250YWluZXIud2lkdGg7XG4gICAgICAgICAgICBjb25zdCBjb250YWluZXJNZWFzdXJlZFdpZHRoID0gdGhpcy5jb250YWluZXIuZ2V0TWVhc3VyZWRXaWR0aCgpO1xuICAgICAgICAgICAgY29uc3QgY29udGFpbmVyTWVhc3VyZWRIZWlnaHQgPSB0aGlzLmNvbnRhaW5lci5nZXRNZWFzdXJlZEhlaWdodCgpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coIGBDb250YWluZXI6IFdpZHRoIC0tPiAkeyBjb250YWluZXJXaWR0aC52YWx1ZSB9IE1lYXN1cmVkIFdpZHRoIC0tPiAkeyBjb250YWluZXJNZWFzdXJlZFdpZHRoIH1gIClcblxuICAgICAgICAgICAgLy8gZHJhZ2dhYmxlIGRpbWVuc2lvbnNcbiAgICAgICAgICAgIGNvbnN0IGRyYWdnYWJsZVdpZHRoID0gPGFueT4gdGhpcy5kcmFnZ2FibGUud2lkdGhcbiAgICAgICAgICAgIGNvbnN0IGRyYWdnYWJsZU1lYXN1cmVkV2lkdGggPSB0aGlzLmRyYWdnYWJsZS5nZXRNZWFzdXJlZFdpZHRoKCk7XG4gICAgICAgICAgICBjb25zdCBkcmFnZ2FibGVNZWFzdXJlZEhlaWdodCA9IHRoaXMuZHJhZ2dhYmxlLmdldE1lYXN1cmVkSGVpZ2h0KCk7XG4gICAgICAgICAgICBjb25zdCBjb252RmFjdG9yID0gZHJhZ2dhYmxlV2lkdGggLyBkcmFnZ2FibGVNZWFzdXJlZFdpZHRoXG4gICAgICAgICAgICBjb25zb2xlLmxvZyggYERyYWdnYWJsZTogV2lkdGggLS0+ICR7IGRyYWdnYWJsZVdpZHRoIH0gTWVhc3VyZWQgV2lkdGggLS0+ICR7IGRyYWdnYWJsZU1lYXN1cmVkV2lkdGggfWAgKVxuXG4gICAgICAgICAgICBsZXQgZWRnZVggPSAoICggY29udGFpbmVyTWVhc3VyZWRXaWR0aCAtIGRyYWdnYWJsZU1lYXN1cmVkV2lkdGggKSAqIGNvbnZGYWN0b3IgKSAvIDI7XG4gICAgICAgICAgICBsZXQgZWRnZVkgPSAoICggY29udGFpbmVyTWVhc3VyZWRIZWlnaHQgLSBkcmFnZ2FibGVNZWFzdXJlZEhlaWdodCApICogY29udkZhY3RvciApIC8gMjtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCBgRWRnZXM6IFggLS0+ICR7IGVkZ2VYIH0gWSAtLT4gJHsgZWRnZVkgfWAgKVxuXG4gICAgICAgICAgICAvL3ZhbGlkYXRlIGVkZ2VzXG4gICAgICAgICAgICBpZiAoIE1hdGgucm91bmQoIE1hdGguYWJzKCB0aGlzLmRyYWdnYWJsZS50cmFuc2xhdGVYICkgKSA+IGVkZ2VYICkge1xuICAgICAgICAgICAgICAgIHRoaXMuZHJhZ2dhYmxlLnRyYW5zbGF0ZVggPSB0aGlzLmRyYWdnYWJsZS50cmFuc2xhdGVYIDwgMCA/IC1NYXRoLmFicyggZWRnZVggKSA6IGVkZ2VYO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCB0aGlzLmRyYWdnYWJsZS50cmFuc2xhdGVZIDwgMCAmJiBNYXRoLnJvdW5kKCBNYXRoLmFicyggdGhpcy5kcmFnZ2FibGUudHJhbnNsYXRlWSApICkgPiBlZGdlWSApIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRyYWdnYWJsZS50cmFuc2xhdGVZID0gLU1hdGguYWJzKCBlZGdlWSApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKCBhcmdzLnN0YXRlID09PSAzICkgLy8gdXBcbiAgICAgICAge1xuICAgICAgICAgICAgY29uc29sZS5sb2coIGBUcmFuc2xhdGUgWCAtLT4gJHsgdGhpcy5kcmFnZ2FibGUudHJhbnNsYXRlWCB9LCBUcmFuc2xhdGUgWSAtLT4gJHsgdGhpcy5kcmFnZ2FibGUudHJhbnNsYXRlWSB9YCApXG4gICAgICAgICAgICB0aGlzLmRyYWdnYWJsZS5hbmltYXRlKCB7XG4gICAgICAgICAgICAgICAgc2NhbGU6IHsgeDogMSwgeTogMSB9XG4gICAgICAgICAgICB9ICk7XG4gICAgICAgIH1cbiAgICB9XG59Il19