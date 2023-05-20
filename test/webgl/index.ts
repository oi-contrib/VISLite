let el = document.getElementById("root")

import WebGL from '../../src/WebGL'
import Matrix4 from '../../src/Matrix4/index'

let painter = new WebGL(el)

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

                            painter.render({
                                region: "物体1",
                                matrix: new Matrix4().rotate(1, 1, 1, 0),
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


                            painter.render({
                                region: "物体2",
                                matrix: new Matrix4().rotate(1, 1, 0, 0),
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

                            painter.render({
                                region: "物体3",
                                matrix: new Matrix4(),
                                mesh: [{
                                    geometry: {
                                        attributes: {
                                            position: {
                                                array: [
                                                    0.5, 0.5, -0.5,
                                                    0.5, -0.5, -0.5,
                                                    -0.5, 0, -0.7
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

                            console.log(painter)

                            el.addEventListener("click", event => {
                                painter.getRegion(event.offsetX, event.offsetY).then(data => {
                                    console.log("点击的区域：" + data)
                                })
                            })

                            setInterval(() => {
                                painter.rotate(0.05, 0, 1, 0).review()
                            }, 40)

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
image0.src = "../../docs/images/github.png"