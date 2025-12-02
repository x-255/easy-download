import { useAppStore } from '@renderer/store'
import { Setting } from '@renderer/store/setting-slice'
import {
  Button,
  Form,
  Input,
  InputNumber,
  InputProps,
  Modal,
  Space,
} from 'antd'
import { useImperativeHandle, useState } from 'react'

export interface SettingModalRef {
  open: () => void
}

export interface SettingModalProps {
  ref: React.Ref<SettingModalRef>
}

export default function SettingModal({ ref }: SettingModalProps) {
  const setting = useAppStore((state) => state.setting)
  const setSetting = useAppStore((state) => state.setSetting)
  const [isOpen, setIsOpen] = useState(false)
  const [form] = Form.useForm<Setting>()

  useImperativeHandle(ref, () => ({
    open: () => {
      form.setFieldsValue(setting)
      setIsOpen(true)
    },
  }))

  const handleOk = () => {
    form.submit()
  }

  const handleCancel = () => {
    form.resetFields()
    setIsOpen(false)
  }

  const onFinish = (values: Setting) => {
    setSetting(values)
    setIsOpen(false)
  }

  const openFile = async () => {
    const path = await window.api.openFile()
    if (path) {
      form.setFieldValue('storagePath', path)
      console.log(
        `form.getFieldValue('storagePath')====`,
        form.getFieldValue('storagePath')
      )
    }
  }

  const FileInput = ({ ...props }: InputProps) => {
    return (
      <Space.Compact className="w-full">
        <Input {...props} />
        <Button onClick={openFile}>选择</Button>
      </Space.Compact>
    )
  }

  return (
    <Modal
      title="新建下载任务"
      okText="保存"
      cancelText="取消"
      centered
      open={isOpen}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item label="下载目录" name="storagePath" required>
          <FileInput />
        </Form.Item>
        <Form.Item label="最大同时下载数" name="dlLimit" required>
          <InputNumber min={1} className="w-full!" />
        </Form.Item>
      </Form>
    </Modal>
  )
}
