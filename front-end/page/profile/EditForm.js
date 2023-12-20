import React, { useState, useEffect } from "react";
import { Form, Input, Button } from "antd";
import { FaStar } from "react-icons/fa";

const EditForm = ({ record, setEditFormData }) => {
  const [form] = Form.useForm();
  const [formData, setFormData] = useState({});
  const [rating, setRating] = useState({
    currentValue: 0,
    hoverValue: undefined,
  });
  const stars= Array(5).fill(0);
  const colors = {
    orange: "#FFBA5A",
    grey: "#a9a9a9",
  };

  const handleClick = (value) => {
    setRating({
      ...rating,
      currentValue: value,
    });
    setEditFormData((prevData) => ({
        ...prevData,
        rating: value,
    }));
  };

  const handleMouseOver = (newHoverValue) => {
    setRating({
      ...rating,
      hoverValue: newHoverValue,
    });
  };

  const handleMouseLeave = () => {
    setRating({
      ...rating,
      hoverValue: undefined,
    });
  };

  useEffect(() => {
    if (record) {
      setFormData(record);
      setRating({
        ...rating,
        currentValue: record.rating,
      });
      form.setFieldsValue(record);
    }
  }, [record, form]);

  const handleChange = () => {
    const updatedData = form.getFieldsValue();
    setEditFormData((prevData) => ({
      ...prevData,
      ...updatedData,
    }));
    console.log(updatedData);
  };

  return (
    <Form form={form} layout="vertical" onValuesChange={handleChange}>
      <Form.Item
        label="コメント"
        name="content"
        initialValue={formData.content}
      >
        <Input.TextArea />
      </Form.Item>
      <Form.Item label="投票" name="rating" initialValue={formData.rating}>
        <div style={{ display: "flex", alignItems: "center" }}>
        {stars.map((_, index) => (
            <FaStar
              key={index}
              size={24}
              onClick={() => handleClick(index + 1)}
              onMouseOver={() => handleMouseOver(index + 1)}
              onMouseLeave={handleMouseLeave}
              color={
                (rating.hoverValue || rating.currentValue) > index
                  ? colors.orange
                  : colors.grey
              }
              style={{
                marginRight: 10,
                cursor: "pointer",
              }}
            />
          ))}
        </div>
      </Form.Item>
    </Form>
  );
};

export default EditForm;
