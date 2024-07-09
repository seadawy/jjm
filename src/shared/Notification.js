import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Notification = ({ type, message, fullpage = false, goback = false }) => {
    const [show, setShow] = useState(fullpage);
    const history = useHistory();
    useEffect(() => {
        if (!fullpage && message && message.length > 0) {
            setShow(true);
            const timer = setTimeout(() => {
                setShow(false);
            }, 5000);
            return () => clearTimeout(timer);
        }
        if (goback) {
            const timer = setTimeout(() => {
                history.goBack();
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [message]);

    let theme;
    switch (type) {
        case "accept":
            theme = 'bg-teal-100 border-teal-500 text-teal-900';
            break;
        case "error":
            theme = 'bg-red-100 border-red-500 text-red-900';
            break;
        default:
            theme = 'bg-yallow-100 border-yallow-500 text-yallow-900';
            break;
    }
    return (
        <>
            {show && (
                <div
                    className={`border-t-4 rounded ${theme}
                     px-3 me-6 py-3 shadow-md w-full sticky z-50 bottom-2 right-0`}
                    role="alert"
                >
                    <div className="flex">
                        <div className="p-2 px-5 text-3xl">
                            {
                                (type === 'accept' && <i className="pi pi-check-circle"></i>) ||
                                (type === 'info' && <i className="pi pi-exclamation-circle"></i>) ||
                                (type === 'error' && <i className="pi pi-exclamation-triangle"></i>)
                            }
                        </div>
                        <div className="ms-3">
                            <p className="font-bold text-lg">
                                {
                                    (type === 'accept' && "The Process was successful") ||
                                    (type === 'info' && "Information") ||
                                    (type === 'error' && "Error")
                                }
                            </p>
                            <p className="">
                                {message.map((data, index) => (
                                    <li key={index}>
                                        {data}
                                        <br />
                                    </li>
                                ))}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Notification;
