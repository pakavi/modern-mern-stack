const errorHandler = (err, req, res, next) => {
    console.log(err);
    res.status(500).json({ message: "There was an error" });
};

export default errorHandler;
