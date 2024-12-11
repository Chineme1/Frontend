import React from 'react'
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

const AddBook = () => {
    const [newItem, setNewItem] = useState({
        name: "",
        description: "",
        price: "",
        image: null
    });
    const [selectedImage, setSelectedImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const handleAdd = async () => {
        try {
            setLoading(true);

            // API integration
            // await 
            // const updatedItems = await getMenuItems();
            // setMenuItems(updatedItems);
            // toast.success("Book added successfully");
            // setNewItem({
            //     name: "",
            //     description: "",
            //     price: "",
            //     image: {selectedImage}
            // });
            // setLoading(false);

        } catch (err) {
            setError("Failed to add book to catalogue");
            setLoading(false);
        }
    };
    return (
        <div className="container mx-auto p-4 min-h-screen ">
            Add Book
            <div className="mt-4">
                <div className="mx-auto w-[350px] rounded shadow-lg">
                    <form
                        className="mx-auto p-4 text-sm"
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleAdd();
                        }}
                    >
                        <div className="flex flex-col gap-6">
                            <div className="w-full">
                                <p>Name</p>
                                <input
                                    type="text"
                                    className="border py-1.5 px-2 mt-1 rounded w-full"
                                    value={newItem.name}
                                    onChange={(e) =>
                                        setNewItem({ ...newItem, name: e.target.value })
                                    }
                                    required
                                />
                            </div>

                            <div>
                                <p>Description</p>
                                <input
                                    type="text"
                                    className="border py-1.5 px-2 mt-1 rounded w-full"
                                    value={newItem.description}
                                    onChange={(e) =>
                                        setNewItem({ ...newItem, description: e.target.value })
                                    }
                                    required
                                />
                            </div>
                            <div>
                                <p>Price</p>
                                <input
                                    type="number"
                                    className="border py-1.5 px-2 mt-1 rounded w-full"
                                    value={newItem.price}
                                    onChange={(e) =>
                                        setNewItem({ ...newItem, price: e.target.value })
                                    }
                                    required
                                />
                            </div>
                            <div>
                                <input
                                    type="file"
                                    name="myImage"
                                    onChange={(event) => {
                                        setSelectedImage(event.target.files[0]);
                                    }}
                                />
                            </div>
                            {selectedImage && (
                                <div>
                                    <img
                                        alt="not found"
                                        width={"250px"}
                                        src={URL.createObjectURL(selectedImage)}
                                    />
                                    <br /> <br />
                                    <button onClick={() => setSelectedImage(null)}>Remove</button>
                                </div>
                            )}
                        </div>
                        <div className="mx-auto text-center mt-2 mb-2">
                            <button
                                type="submit "
                                className="mt-4  bg-blue-500 text-white px-4 py-2 rounded"
                            >
                                {loading ? "Adding..." : "Add Book"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AddBook