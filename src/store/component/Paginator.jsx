const Paginator = ({ links, pageChange }) => {
    return (
        <>
            <div className="flex flex-wrap justify-center gap-2 mt-4">
                {links.map((link, index) => {
                    return (
                        <button key={index}
                            className={(link.active ? 'bg-indigo-900' : '') + ` bg-indigo-500 py-2 px-3 rounded-md text-white hover:bg-indigo-300 disabled:bg-indigo-300`}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                            disabled={!link.url}
                            onClick={() => { pageChange(link.url) }}
                        />
                    )
                })}
            </div>
        </>
    );
}

export default Paginator;