#include <common>
#include <packing>
#include <fog_pars_fragment>

varying vec2 vUv;
uniform sampler2D tnoise;
uniform float time;
uniform vec3 waterColor;

vec2 wavePos = vec2(0.5, 0.5);
float frequency = 25.0;
float waveSpeed = 3.0;
float waveStrength = 0.6;

float noiseAmplitude = 0.15;

float peakWidth = 0.006;
float highlightIntensity = 1.0;

float rippleRadius = 0.5;

void main() {

    float dist = length(vUv - wavePos);

    float wave = sin(dist*frequency - time*waveSpeed) * waveStrength;
    float noise = texture2D(tnoise, vUv*3.0 + time*0.05).r ;
    wave += noise * noiseAmplitude;

    
    float falloff = 1.0 - smoothstep(0.0, rippleRadius, dist);
    


    // normalize to 0..1 for easy mixing
    float rippleNorm = wave * 0.5 + 0.5;

    float peakCenter =0.5;
    float x = (rippleNorm - peakCenter) / peakWidth;
    float peakMask = exp(-x*x);

    float mask = clamp(peakMask*highlightIntensity, 0.0, 1.0);
    
    
    vec3 base = waterColor;

    vec3 highlight = vec3(1.0, 1.0, 1.0);

    // fade highlight by falloff
    float fadedMask = mask * falloff;

    vec3 color = mix(base, highlight, fadedMask);

    gl_FragColor = vec4(color, 1.0);

    #include <tonemapping_fragment>
    #include <colorspace_fragment>
    #include <fog_fragment>
}
