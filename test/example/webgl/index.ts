import WebGL from '../../../src/WebGL'
import viewHandler from '../../../src/viewHandler'

import type { geometryType } from '../../../types/Object3D'
import Object3D from '../../../types/Object3D'

let el0 = document.getElementById("root0")

let painter0 = new WebGL(el0)
let obj3d = {
    mesh: [{
        geometry: {
            attributes: {
                position: {
                    array: [
                        1, -1,
                        -1, -1,
                        0, 1
                    ],
                    count: 3,
                    itemSize: 2
                }
            },
            type: "TRIANGLES"
        },
        material: {
            // color: {
            //     r: 1,
            //     g: 0,
            //     b: 1,
            //     alpha: 1
            // }
            colors: {
                array: [
                    1, 0, 0,
                    0, 1, 0,
                    0, 0, 1
                ],
                count: 3,
                itemSize: 3
            }
        }
    }]
} as Object3D
// } satisfies Object3D

painter0.render(obj3d)

let el1 = document.getElementById("root1")

let painter1 = new WebGL(el1, {
    region: true
})

let image0 = new Image();
image0.onload = function () {
    var image1 = new Image();
    image1.onload = function () {
        var image2 = new Image();
        image2.onload = function () {
            var image3 = new Image();
            image3.onload = function () {
                var image4 = new Image();
                image4.onload = function () {
                    var image5 = new Image();
                    image5.onload = function () {
                        var image6 = new Image();
                        image6.onload = function () {

                            painter1.render({
                                region: "物体1",
                                matrix: painter1.matrix().rotate(1, 1, 1, 0),
                                mesh: [{
                                    geometry: {
                                        attributes: {
                                            position: {
                                                array: [
                                                    0.5, 0.5, 0.5,
                                                    0.5, -0.5, 0.5,
                                                    -0.5, -0.5, 0.5,
                                                    -0.5, 0.5, 0.5,
                                                    0.5, 0.5, -0.5,
                                                    0.5, -0.5, -0.5,
                                                    -0.5, -0.5, -0.5,
                                                    -0.5, 0.5, -0.5
                                                ],
                                                count: 8,
                                                itemSize: 3
                                            },
                                            normal: {
                                                array: [
                                                    0.5, 0.5, 0.5,
                                                    0.5, -0.5, 0.5,
                                                    -0.5, -0.5, 0.5,
                                                    -0.5, 0.5, 0.5,
                                                    0.5, 0.5, -0.5,
                                                    0.5, -0.5, -0.5,
                                                    -0.5, -0.5, -0.5,
                                                    -0.5, 0.5, -0.5
                                                ],
                                                count: 8,
                                                itemSize: 3
                                            }
                                        },
                                        index: {
                                            array: [
                                                0, 1, 3, 1, 2, 3,
                                                4, 5, 6, 4, 6, 7,
                                                0, 4, 7, 0, 3, 7,
                                                1, 6, 5, 1, 2, 6,
                                                0, 1, 5, 0, 5, 4,
                                                2, 6, 7, 2, 3, 7
                                            ],
                                            count: 36,
                                            itemSize: 1
                                        },
                                        type: "TRIANGLES"
                                    },
                                    material: {

                                        cube: {
                                            left: {
                                                image: {
                                                    value: image1
                                                }
                                            },
                                            right: {
                                                image: {
                                                    value: image2
                                                }
                                            },
                                            near: {
                                                image: {
                                                    value: image3
                                                }
                                            },
                                            far: {
                                                image: {
                                                    value: image4
                                                }
                                            },
                                            top: {
                                                image: {
                                                    value: image5
                                                }
                                            },
                                            bottom: {
                                                image: {
                                                    value: image6
                                                }
                                            }
                                        }
                                    }
                                }]
                            })


                            painter1.render({
                                region: "物体2",
                                matrix: painter1.matrix().rotate(1, 1, 0, 0),
                                mesh: [{
                                    geometry: {
                                        attributes: {
                                            position: {
                                                array: [
                                                    0.5, 0.5, 0.5,
                                                    0.5, -0.5, 0.5,
                                                    -0.5, -0.5, 0.5,
                                                    -0.5, 0.5, 0.5,
                                                    0.5, 0.5, -0.5,
                                                    0.5, -0.5, -0.5,
                                                    -0.5, -0.5, -0.5,
                                                    -0.5, 0.5, -0.5
                                                ],
                                                count: 8,
                                                itemSize: 3
                                            },
                                        },
                                        index: {
                                            array: [
                                                0, 1, 3, 1, 2, 3,
                                                4, 5, 6, 4, 6, 7,
                                                0, 4, 7, 0, 3, 7,
                                                1, 6, 5, 1, 2, 6,
                                                0, 1, 5, 0, 5, 4,
                                                2, 6, 7, 2, 3, 7
                                            ],
                                            count: 36,
                                            itemSize: 1
                                        },
                                        type: "TRIANGLES"
                                    },
                                    material: {

                                        color: {
                                            r: 1,
                                            g: 0,
                                            b: 1,
                                            alpha: 1
                                        }
                                    }
                                }]
                            })

                            painter1.render({
                                region: "物体3",
                                matrix: painter1.matrix().rotate(0.1, 1, 0, 0),
                                mesh: [{
                                    geometry: {
                                        attributes: {
                                            position: {
                                                array: [
                                                    0.7, 0.5, 0.5,
                                                    0.5, -0.5, 0.5,
                                                    -0.7, 0, 0.7
                                                ],
                                                count: 3,
                                                itemSize: 3
                                            },
                                            uv: {
                                                array: [
                                                    1, 0,
                                                    1, 1,
                                                    0, 0.5
                                                ],
                                                count: 3,
                                                itemSize: 2
                                            }
                                        },
                                        type: "TRIANGLES"
                                    },
                                    material: {
                                        image: {
                                            value: image0
                                        },
                                        // color: {
                                        //     r: 1,
                                        //     g: 0,
                                        //     b: 1,
                                        //     alpha: 1
                                        // }
                                    }
                                }]
                            })

                            console.log(painter1)
                            let object3Ds = painter1.getObject3D()
                            console.log(object3Ds)

                            let oldMaterial: Array<any> = []
                            el1?.addEventListener("click", event => {
                                painter1.getRegion(event.offsetX, event.offsetY).then(data => {
                                    console.log("点击的区域：" + data)

                                    for (let index = 0; index < object3Ds.length; index++) {
                                        if (!oldMaterial[index]) {
                                            oldMaterial[index] = object3Ds[index].mesh[0].material
                                        }

                                        if (data == object3Ds[index].region) {
                                            object3Ds[index].mesh[0].material = {
                                                color: {
                                                    r: 0,
                                                    g: 1,
                                                    b: 0,
                                                    alpha: 1
                                                }
                                            }
                                        } else {
                                            object3Ds[index].mesh[0].material = oldMaterial[index]
                                        }
                                    }

                                    painter1.review()
                                })
                            })

                            // setInterval(() => {
                            //     painter1.getMatrix().rotate(0.05, 0, 1, 0)
                            //     painter1.review()
                            // }, 40)

                            let matrix1 = painter1.getMatrix()

                            // setTimeout(() => {
                            //     matrix.rotate(0.4, 1, 0, 0)
                            //     painter1.review()
                            // }, 0);

                            viewHandler(function (params) {


                                // console.log(params.value)

                                // 键盘控制
                                if (params.type == 'lookUp') {
                                    matrix1.rotate(params.value, -1, 0, 0)
                                } else if (params.type == 'lookDown') {
                                    matrix1.rotate(params.value, 1, 0, 0)
                                } else if (params.type == 'lookLeft') {
                                    matrix1.rotate(params.value, 0, -1, 0)
                                } else if (params.type == 'lookRight') {
                                    matrix1.rotate(params.value, 0, 1, 0)
                                }

                                // 鼠标拖动或手指控制
                                else if (params.type == 'rotate') {
                                    matrix1.rotate(params.value, params.normal[0], params.normal[1], params.normal[2])
                                }

                                // 滚轮控制
                                else if (params.type == 'scale') {
                                    matrix1.scale(params.value, params.value, params.value, 0, 0, 0)
                                }

                                painter1.review()
                            })

                        }
                        image6.src = "./skybox/bottom.jpg"
                    }
                    image5.src = "./skybox/top.jpg"
                }
                image4.src = "./skybox/far.jpg"
            }
            image3.src = "./skybox/near.jpg"
        }
        image2.src = "./skybox/right.jpg"
    }
    image1.src = "./skybox/left.jpg"
}
image0.src = "../../../docs/images/github.png"

var el2 = document.getElementById("root2");

var painter2 = new WebGL(el2, {
    region: false
});

var boxGeometry = function (x: number, y: number, z: number, xsize: number, ysize: number, zsize: number) {
    var dx = xsize * 0.5, dy = ysize * 0.5, dz = zsize * 0.5;
    return {
        attributes: {
            position: {
                array: [
                    // 前、后、左、右、上、下
                    x - dx, y + dy, z + dz, x + dx, y + dy, z + dz, x - dx, y - dy, z + dz, x + dx, y - dy, z + dz,
                    x - dx, y + dy, z - dz, x + dx, y + dy, z - dz, x - dx, y - dy, z - dz, x + dx, y - dy, z - dz,
                    x - dx, y + dy, z - dz, x - dx, y + dy, z + dz, x - dx, y - dy, z - dz, x - dx, y - dy, z + dz,
                    x + dx, y + dy, z - dz, x + dx, y + dy, z + dz, x + dx, y - dy, z - dz, x + dx, y - dy, z + dz,
                    x - dx, y + dy, z - dz, x + dx, y + dy, z - dz, x - dx, y + dy, z + dz, x + dx, y + dy, z + dz,
                    x - dx, y - dy, z - dz, x + dx, y - dy, z - dz, x - dx, y - dy, z + dz, x + dx, y - dy, z + dz,
                ],
                count: 24,
                itemSize: 3
            }
        },
        index: {
            array: [
                0, 1, 2, 1, 2, 3,
                4, 5, 6, 5, 6, 7,
                8, 9, 10, 9, 10, 11,
                12, 13, 14, 13, 14, 15,
                16, 17, 18, 17, 18, 19,
                20, 21, 22, 21, 22, 23
            ],
            count: 36,
            itemSize: 1
        },
        type: <geometryType>"TRIANGLES"
    }
};

let rectGeometry = function (x: number, y: number, z: number, xsize: number, zsize: number) {
    let dx = xsize * 0.5, dz = zsize * 0.5;
    return {
        attributes: {
            position: {
                array: [
                    x - dx, y, z - dz, x + dx, y, z - dz, x - dx, y, z + dz, x + dx, y, z + dz
                ],
                count: 4,
                itemSize: 3
            },
            uv: {
                array: [
                    0, 0,
                    1, 0,
                    0, 1,
                    1, 1
                ],
                count: 4,
                itemSize: 2
            }
        },
        index: {
            array: [
                0, 1, 2, 1, 2, 3
            ],
            count: 6,
            itemSize: 1
        },
        type: <geometryType>"TRIANGLES"
    }
};

let promises: Array<any> = [], images: any = {};
["floor"].forEach(function (name) {
    promises.push(new Promise(function (resolve) {
        var image = new Image();
        image.onload = function () {
            images[name] = image;
            resolve("");
        };
        image.src = "./" + name + ".jpg";
    }));
});

let matrix2 = painter2.getMatrix();

matrix2.scale(1.5, 1.5, 1.5, 0, 0, 0).rotate(0.5, 1, 0, 0)

Promise.all(promises).then(function () {

    // 地板
    painter2.render({
        matrix: painter2.matrix().move(0.1, 0, 0, 1),//.rotate(-0.5, 1, 0, 0),
        mesh: [{
            geometry: boxGeometry(0, 0, 0, 2, 0.03, 2),
            material: {
                color: {
                    r: 0.7,
                    g: 0.7,
                    b: 0.7,
                    alpha: 1
                }
            }
        }, {
            geometry: rectGeometry(0, 0.015, 0, 2, 2),
            material: {
                image: {
                    value: images.floor
                }
            }
        }, {
            geometry: rectGeometry(0, -0.015, 0, 2, 2),
            material: {
                image: {
                    value: images.floor
                }
            }
        }]
    });

    // 绘制主机
    // let mesh = []
    // for (var x = 0; x <= 10; x += 1) {
    //     for (var z = 0; z <= 10; z += 1) {
    //         mesh.push({
    //             geometry: boxGeometry(x * 0.2 - 1, 0.115, z * 0.2 - 1, 0.05, 0.2, 0.05),
    //             material: {
    //                 color: {
    //                     r: 0.7,
    //                     g: 0.7,
    //                     b: 0.7,
    //                     alpha: 1
    //                 }
    //             }
    //         })
    //     }
    // }
    // painter2.render({
    //     region: "",
    //     matrix: painter2.matrix().rotate(0.2, 1, 0, 0),
    //     mesh
    // });

    for (var x = 0; x <= 10; x += 1) {
        for (var z = 0; z <= 10; z += 1) {
            painter2.render({
                region: x + "-" + z,
                // matrix: painter2.matrix().rotate(0.2, 1, 0, 0),
                mesh: [{
                    geometry: boxGeometry(x * 0.2 - 1, 0.115, z * 0.2 - 1, 0.02, 0.5, 0.01),
                    material: {
                        color: {
                            r: 0.7,
                            g: 0.7,
                            b: 0.7,
                            alpha: 1
                        }
                    }
                }]
            });
        }
    }
});

viewHandler(function (params) {

    // console.log(params)

    // 键盘控制
    if (params.type == 'lookUp') {
        matrix2.rotate(params.value, -1, 0, 0);
    } else if (params.type == 'lookDown') {
        matrix2.rotate(params.value, 1, 0, 0);
    } else if (params.type == 'lookLeft') {
        matrix2.rotate(params.value, 0, -1, 0);
    } else if (params.type == 'lookRight') {
        matrix2.rotate(params.value, 0, 1, 0);
    }

    // 鼠标拖动或手指控制
    else if (params.type == 'rotate') {
        matrix2.rotate(params.value, params.normal[0], params.normal[1], params.normal[2]);
    }

    // 滚轮控制
    else if (params.type == 'scale') {
        matrix2.scale(params.value, params.value, params.value, 0, 0, 0);
    }

    painter2.review();
})

// el2.addEventListener("click", event => {
//     painter2.getRegion(event.offsetX, event.offsetY).then(data => {
//         alert("点击的区域：" + data)
//     })
// })