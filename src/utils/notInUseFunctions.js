export const NotInUseDecorator = (func) => {
    return (...args) => {
        console.warn('This function is not In use Anyway running it');
        return func(...args);
    }
}