precision mediump float;

uniform sampler2D u_sampler;
varying vec2 v_textcoord;

void main()
{
    gl_FragColor = texture2D(u_sampler, v_textcoord);
}