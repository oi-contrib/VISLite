attribute vec4 a_position;
uniform mat4 u_matrix;
attribute vec2 a_textcoord;
varying vec2 v_textcoord;

void main()
{
    vec4 temp = u_matrix * a_position;
    temp.z = -1.0 * temp.z;
    float dist = 4.0;
    gl_Position = vec4((dist + 1.0) * temp.x, (dist + 1.0) * temp.y, dist * (dist + temp.z) + 1.0 - dist * dist, temp.w * 2.0 * (dist + temp.z));

    v_textcoord = a_textcoord;
}