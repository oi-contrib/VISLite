attribute vec4 a_position;

uniform mat4 u_matrix_world;
uniform mat4 u_matrix_mesh;
uniform mat4 u_matrix_proporion;

attribute vec2 a_textcoord;
varying vec2 v_textcoord;

void main(){
    gl_Position = u_matrix_world * u_matrix_proporion * u_matrix_mesh * a_position;

    v_textcoord = a_textcoord;
}