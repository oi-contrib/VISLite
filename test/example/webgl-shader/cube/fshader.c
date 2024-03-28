precision mediump float;

varying vec3 v_normal;
uniform samplerCube u_texture;

void main()
{
    gl_FragColor = textureCube(u_texture, normalize(v_normal));
}