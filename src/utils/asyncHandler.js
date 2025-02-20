// const asyncHandler = (requestHandler) => {
//     (req, res, next) => {
//         Promise
//         .resolve(
//             requestHandler(req, res, next)
//         ).catch(
//             (error) => next(error)
//         )
//     }
// }

// 



const asyncHandler = (fn) => async(req, res, next) => {
    try {
        await fn(req, res, next);
    } catch (error) {
        res.status(error.code || 500).json({
            success: false,
            message: error.message
        })
    }
}

export {asyncHandler}


// this wrapper will ease our life alot. we will need this so much and each time 
// this will save this much line of cluttery code.