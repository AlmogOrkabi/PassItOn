import React from 'react';
import BottomErrorMsg from './BottomErrorMsg';
class ErrorBoundary extends React.Component {

    state = { hasError: false };

    static getDerivedStateError(error) {
        console.log("ERROR HERE")
        return { hasError: true };
    }

    componentDidCatch(error, info) {
        console.log("Error: " + error, "info: " + info);
    }


    render() {
        if (this.state.hasError) {
            //return this.props.fallback;
            return (
                <ErrorBoundary msg='בדיקה' />
            )

        }
        return this.props.children;
    }

}

export default ErrorBoundary;