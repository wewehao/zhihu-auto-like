import React, { Component } from 'react';
import { Form, Input, Button, Spin } from 'antd';
import "../../common/antd.css";
import "./index.less";

import { isUrl, openUrls } from '../../common/utils';

const { TextArea } = Input;

class Popup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
        };

        this.submitForm = this.submitForm.bind(this);
    }
    async componentDidMount() {
        this.setState({ isLoading: false })
    }
    async submitForm({ urlsText }) {
        const urls = urlsText.split('\n').filter(v => isUrl(v));
        this.setState({ isLoading: true });
        openUrls(urls).then(() => {
            window.close();
        });
    }
    render() {
        const { isLoading } = this.state;

        return (
            <div className="popup-container">
                <Spin tip="加载中..." spinning={isLoading}>
                    <Form layout="vertical" className="login-form" onFinish={this.submitForm}>
                        <Form.Item className="form-item-title">
                            <h3>知乎一键点赞</h3>
                        </Form.Item>
                        <Form.Item label="点赞链接" name="urlsText" rules={[
                            { required: true, message: "请粘贴点赞链接" }
                        ]}>
                            <TextArea rows={8} placeholder="请粘贴点赞链接" />
                        </Form.Item>
                        <Form.Item className="form-item-submit">
                            <Button type="primary" block htmlType="submit">确定</Button>
                        </Form.Item>
                    </Form>
                </Spin>
            </div>
        )
    }
}

export default Popup;
