attribute vec4 a_position;
attribute vec2 a_textcoord;
varying vec2 v_textcoord;

void main(){
    gl_Position = a_position;
    v_textcoord = a_textcoord;
}