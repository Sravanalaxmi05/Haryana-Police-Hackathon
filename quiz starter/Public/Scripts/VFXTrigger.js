// VFXTrigger.js
// Version: 0.1.0
// Event: OnAwake
// Description: Custom made script to send the duration time, textures for burst VFX

// @input Component.VFXComponent vfx
// @input float duration {"label": "Burst Duration"}
//@input Asset.Texture texture

var initialized = false;
var zOffset = 40;
var randomScale = 10;
script.triggerVFX = triggerVFX;
function triggerVFX(texture) {
    if (!initialized) {
        print("ERROR: VFXTrigger is not initialized");
        return;
    } 
   
    var burstDur = script.duration + getTime();
    script.vfx.asset.properties["center"]= new vec3((Math.random()-0.5) * randomScale,(Math.random()-0.5) * randomScale,(Math.random()-0.5) * randomScale - zOffset);
    script.vfx.asset.properties["burstDuration"] = burstDur;
    script.vfx.asset.properties["mainTex"] = texture;  
}


function initialize() {
    if (!script.vfx) {
        print("ERROR: Please set the VFX component to the script.");
        return;
    }
    if (!script.vfx.asset) {
        print("ERROR: Please make sure VFX component contains VFX asset.");
        return;
    }
    script.vfx.asset =script.vfx.asset.clone();
    initialized = true;
}


initialize();



