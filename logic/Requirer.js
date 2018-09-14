const imageRequirements =
    [
        require('../prototypeImages/goal_1.jpg'),
        require('../prototypeImages/goal_2.jpg'),
        require('../prototypeImages/goal_3.jpg'),
        require('../prototypeImages/goal_4.jpg'),
        require('../prototypeImages/goal_5.jpg'),
        require('../prototypeImages/goal_6.jpg'),
        require('../prototypeImages/goal_7.jpg'),
        require('../prototypeImages/goal_8.jpg'),
        require('../prototypeImages/goal_9.jpg'),
        require('../prototypeImages/goal_10.jpg'),
        require('../prototypeImages/goal_11.jpg'),
        require('../prototypeImages/goal_12.jpg'),
        require('../prototypeImages/goal_13.jpg'),
        require('../prototypeImages/goal_14.jpg'),
        require('../prototypeImages/goal_15.jpg'),
        require('../prototypeImages/goal_16.jpg'),
        require('../prototypeImages/goal_17.jpg')
    ]

const dynamicImgRequire = (index) => {
    return imageRequirements[index-1] //index starts at 1
}

export default {dynamicImgRequire}
