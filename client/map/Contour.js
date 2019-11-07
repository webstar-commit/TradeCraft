/**
 * Contour.js gets the central point of contour
 */
class Point{
    constructor(x, y){
        this.x=x;
        this.y=y;
    }
}
export default class Contour{
    constructor(points){
        this.pts = points || [];
    }
    area = () =>{
        var area=0;
            var pts = this.pts;
            var nPts = pts.length;
            var j=nPts-1;
            var p1; var p2;

            for (var i=0;i<nPts;j=i++) {
                p1=pts[i]; p2=pts[j];
                area+=p1.x*p2.y;
                area-=p1.y*p2.x;
            }
            area/=2;
                
            return area;
    }
    centroid = () =>{
        var pts = this. pts;
        var nPts = pts.length;
        var x=0; var y=0;
        var f;
        var j=nPts-1;
        var p1; var p2;
     
        for (var i=0;i<nPts;j=i++) {
           p1=pts[i]; p2=pts[j];
           f=p1.x*p2.y-p2.x*p1.y;
           x+=(p1.x+p2.x)*f;
           y+=(p1.y+p2.y)*f;
        }
     
        f=this.area()*6;
         
        return new Point(x/f, y/f);
    }
} 