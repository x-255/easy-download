import { useAppStore } from '@renderer/store'
import { Form, Input, Modal } from 'antd'
import { useImperativeHandle, useState } from 'react'

export interface DownloadModalRef {
  open: () => void
}

export interface DownloadModalProps {
  ref: React.Ref<DownloadModalRef>
}

interface DownloadForm {
  url: string
  filename?: string
}

export default function DownloadModal({ ref }: DownloadModalProps) {
  useImperativeHandle(ref, () => ({
    open: () => {
      setIsOpen(true)
    },
  }))

  const [isOpen, setIsOpen] = useState(false)
  const [form] = Form.useForm<DownloadForm>()
  const addDownloadItem = useAppStore((state) => state.addDownloadItem)

  const handleOk = () => {
    form.submit()
  }

  const handleCancel = () => {
    form.resetFields()
    setIsOpen(false)
  }

  const onFinish = (values: DownloadForm) => {
    addDownloadItem(values)
  }

  return (
    <Modal
      title="新建下载任务"
      okText="开始下载"
      cancelText="取消"
      centered
      open={isOpen}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item label="视频源" name="url" required>
          <Input />
        </Form.Item>
        <Form.Item label="文件名" name="filename">
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  )
}
