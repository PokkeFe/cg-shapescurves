class Renderer {
    // canvas:              object ({id: __, width: __, height: __})
    // num_curve_sections:  int
    constructor(canvas, num_curve_sections, show_points_flag) {
        this.canvas = document.getElementById(canvas.id);
        this.canvas.width = canvas.width;
        this.canvas.height = canvas.height;
        this.ctx = this.canvas.getContext('2d');
        this.slide_idx = 0;
        this.num_curve_sections = num_curve_sections;
        this.show_points = show_points_flag;
    }

    // n:  int
    setNumCurveSections(n) {
        this.num_curve_sections = n;
        this.drawSlide(this.slide_idx);
    }

    // flag:  bool
    showPoints(flag) {
        this.show_points = flag;
        this.drawSlide(this.slide_idx);
    }

    // slide_idx:  int
    drawSlide(slide_idx) {
        this.slide_idx = slide_idx;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        switch (this.slide_idx) {
            case 0:
                this.drawSlide0(this.ctx);
                break;
            case 1:
                this.drawSlide1(this.ctx);
                break;
            case 2:
                this.drawSlide2(this.ctx);
                break;
            case 3:
                this.drawSlide3(this.ctx);
                break;
        }
    }

    // ctx:          canvas context
    drawSlide0(ctx) {
        this.drawRectangle(
            { x: (this.canvas.width / 2) - 100, y: (this.canvas.height / 2) - 200 },
            { x: (this.canvas.width / 2) + 200, y: (this.canvas.height / 2) + 200 },
            [255, 0, 0, 255],
            ctx)
    }

    // ctx:          canvas context
    drawSlide1(ctx) {
        this.drawCircle(
            {
                x: this.canvas.width / 2,
                y: this.canvas.height / 2
            },
            100,
            [51, 51, 51, 255],
            ctx)
    }

    // ctx:          canvas context
    drawSlide2(ctx) {
        this.drawBezierCurve(
            { x: 100, y: 100 },
            { x: 100, y: 500 },
            { x: this.canvas.width, y: this.canvas.height - 400 },
            { x: this.canvas.width, y: this.canvas.height },
            [0, 0, 200, 255],
            ctx
        )
    }

    // ctx:          canvas context
    drawSlide3(ctx) {
        let midx = this.canvas.width / 2
        let midy = this.canvas.height / 2
        // C
        this.drawBezierCurve(
            { x: (midx / 2), y: midy + 100 },
            { x: (midx / 2) - 200, y: midy + 150 },
            { x: (midx / 2) - 200, y: midy - 150 },
            { x: (midx / 2), y: midy - 100 },
            [0, 255, 0, 255],
            ctx
        )
        // O
        this.drawCircle(
            { x: midx / 1.2, y: midy },
            100,
            [0, 0, 255, 255],
            ctx
        )
        // L
        this.drawLine(
            { x: midx + 50, y: midy + 100 },
            { x: midx + 50, y: midy - 100 },
            [255, 0, 0, 255],
            ctx
        )
        this.drawLine(
            { x: midx + 50, y: midy - 100 },
            { x: midx + 150, y: midy - 100 },
            [255, 0, 0, 255],
            ctx
        )
        // E
        this.drawRectangle(
            { x: midx + 200, y: midy - 100 },
            { x: midx + 300, y: midy + 100 },
            [0, 0, 0, 255],
            ctx
        )
        this.drawRectangle(
            { x: midx + 299, y: midy + 100 },
            { x: midx + 301, y: midy - 100 },
            [255, 255, 255, 255],
            ctx
        )
        this.drawRectangle(
            { x: midx + 200, y: midy },
            { x: midx + 275, y: midy },
            [0, 0, 0, 255],
            ctx
        )
    }

    // left_bottom:  object ({x: __, y: __})
    // right_top:    object ({x: __, y: __})
    // color:        array of int [R, G, B, A]
    // ctx:          canvas context
    drawRectangle(left_bottom, right_top, color, ctx) {
        this.drawLine(
            left_bottom,
            { x: left_bottom.x, y: right_top.y },
            color,
            ctx);
        this.drawLine(
            left_bottom,
            { x: right_top.x, y: left_bottom.y },
            color,
            ctx);
        this.drawLine(
            { x: right_top.x, y: left_bottom.y },
            right_top,
            color,
            ctx);
        this.drawLine(
            { x: left_bottom.x, y: right_top.y },
            right_top,
            color,
            ctx);

        if (this.show_points) {
            let p0
            p0 = left_bottom
            this.drawLine({ x: p0.x - 3, y: p0.y - 3 }, { x: p0.x + 3, y: p0.y + 3 }, color, ctx);
            this.drawLine({ x: p0.x - 3, y: p0.y + 3 }, { x: p0.x + 3, y: p0.y - 3 }, color, ctx);
            p0 = right_top
            this.drawLine({ x: p0.x - 3, y: p0.y - 3 }, { x: p0.x + 3, y: p0.y + 3 }, color, ctx);
            this.drawLine({ x: p0.x - 3, y: p0.y + 3 }, { x: p0.x + 3, y: p0.y - 3 }, color, ctx);
            p0 = { x: right_top.x, y: left_bottom.y }
            this.drawLine({ x: p0.x - 3, y: p0.y - 3 }, { x: p0.x + 3, y: p0.y + 3 }, color, ctx);
            this.drawLine({ x: p0.x - 3, y: p0.y + 3 }, { x: p0.x + 3, y: p0.y - 3 }, color, ctx);
            p0 = { x: left_bottom.x, y: right_top.y }
            this.drawLine({ x: p0.x - 3, y: p0.y - 3 }, { x: p0.x + 3, y: p0.y + 3 }, color, ctx);
            this.drawLine({ x: p0.x - 3, y: p0.y + 3 }, { x: p0.x + 3, y: p0.y - 3 }, color, ctx);
        }
    }

    // center:       object ({x: __, y: __})
    // radius:       int
    // color:        array of int [R, G, B, A]
    // ctx:          canvas context
    drawCircle(center, radius, color, ctx) {

        let phi = 0;
        let delta_phi = 2 * Math.PI / this.num_curve_sections
        let p0, p1;
        for (let i = 0; i < this.num_curve_sections; i++) {
            p0 = { x: center.x + radius * Math.cos(phi), y: center.y + radius * Math.sin(phi) };
            p1 = { x: center.x + radius * Math.cos(phi + delta_phi), y: center.y + radius * Math.sin(phi + delta_phi) };
            this.drawLine(
                p0,
                p1,
                color,
                ctx
            )
            phi += delta_phi

            if (this.show_points) {
                this.drawLine({ x: p0.x - 3, y: p0.y - 3 }, { x: p0.x + 3, y: p0.y + 3 }, color, ctx);
                this.drawLine({ x: p0.x - 3, y: p0.y + 3 }, { x: p0.x + 3, y: p0.y - 3 }, color, ctx);
            }
        }
    }

    // pt0:          object ({x: __, y: __})
    // pt1:          object ({x: __, y: __})
    // pt2:          object ({x: __, y: __})
    // pt3:          object ({x: __, y: __})
    // color:        array of int [R, G, B, A]
    // ctx:          canvas context
    drawBezierCurve(pt0, pt1, pt2, pt3, color, ctx) {
        // show control points
        if (this.show_points) {
            for (let p0 of [pt0, pt1, pt2, pt3]) {
                this.drawLine({ x: p0.x, y: p0.y - 3 }, { x: p0.x, y: p0.y + 3 }, color, ctx);
                this.drawLine({ x: p0.x - 3, y: p0.y }, { x: p0.x + 3, y: p0.y }, color, ctx);
            }
        }

        function getBezierCoords(t) {
            return {
                x: (((1 - t) ** 3) * pt0.x) + (3 * t * pt1.x * ((1 - t) ** 2)) + (3 * (1 - t) * pt2.x * (t ** 2)) + ((t ** 3) * pt3.x),
                y: (((1 - t) ** 3) * pt0.y) + (3 * t * pt1.y * ((1 - t) ** 2)) + (3 * (1 - t) * pt2.y * (t ** 2)) + ((t ** 3) * pt3.y)
            }
        }

        let t = 0.0
        let t_delta = 1.0 / this.num_curve_sections
        for (let i = 0; i < this.num_curve_sections; i++) {
            let p0 = getBezierCoords(t)
            t += t_delta;
            let p1 = getBezierCoords(t)

            this.drawLine(p0, p1, color, ctx);

            if (this.show_points) {
                this.drawLine({ x: p0.x - 3, y: p0.y - 3 }, { x: p0.x + 3, y: p0.y + 3 }, color, ctx);
                this.drawLine({ x: p0.x - 3, y: p0.y + 3 }, { x: p0.x + 3, y: p0.y - 3 }, color, ctx);
            }
        }
        if (this.show_points) {
            let p0 = getBezierCoords(1);
            this.drawLine({ x: p0.x - 3, y: p0.y - 3 }, { x: p0.x + 3, y: p0.y + 3 }, color, ctx);
            this.drawLine({ x: p0.x - 3, y: p0.y + 3 }, { x: p0.x + 3, y: p0.y - 3 }, color, ctx);
        }
    }

    // pt0:          object ({x: __, y: __})
    // pt1:          object ({x: __, y: __})
    // color:        array of int [R, G, B, A]
    // ctx:          canvas context
    drawLine(pt0, pt1, color, ctx) {
        ctx.strokeStyle = 'rgba(' + color[0] + ',' + color[1] + ',' + color[2] + ',' + (color[3] / 255.0) + ')';
        ctx.beginPath();
        ctx.moveTo(pt0.x, pt0.y);
        ctx.lineTo(pt1.x, pt1.y);
        ctx.stroke();
    }
};
