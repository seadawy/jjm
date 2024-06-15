import {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
} from '@headlessui/react'
const StoreBrandFilter = ({ type, values }) => {
    return (
        <Disclosure as="div" className="border-t border-gray-200 px-4 py-6">
            {({ open }) => (
                <>
                    <h3 className="-mx-2 -my-3 flow-root">
                        <DisclosureButton className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                            <span className="font-medium text-gray-900">{type}</span>
                            <span className="ml-6 flex items-center">
                                {open ? (
                                    <i className="pi pi-minus h-5 w-5" aria-hidden="true" ></i>
                                ) : (
                                    <i className="pi pi-plus h-5 w-5" aria-hidden="true" ></i>
                                )}
                            </span>
                        </DisclosureButton>
                    </h3>
                    <DisclosurePanel className="pt-6">
                        <div className="space-y-6">
                            {values.map((option, optionIdx) => (
                                <div key={option.id} className="flex items-center">
                                    <input
                                        id={`filter-mobile-${option.id}-${optionIdx}`}
                                        name={`${option.id}[]`}
                                        defaultValue={option.value}
                                        type="checkbox"
                                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                    />
                                    <label
                                        htmlFor={`filter-mobile-${option.id}-${optionIdx}`}
                                        className="ml-3 min-w-0 flex-1 text-gray-500"
                                    >
                                        {option.brand}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </DisclosurePanel>
                </>
            )}
        </Disclosure>
    );
}
export default StoreBrandFilter;