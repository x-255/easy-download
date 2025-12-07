import { useAppStore } from '@renderer/store'
import { Form, Input, InputRef, Modal } from 'antd'
import { useImperativeHandle, useRef, useState } from 'react'

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

  const urlInputRef = useRef<InputRef>(null)
  const [confirmLoading, setConfirmLoading] = useState(false)
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

  const onFinish = async (values: DownloadForm) => {
    setConfirmLoading(true)
    if (values.url.includes('jable.tv')) {
      const info = await window.api.parseJablePage(values.url)
      addDownloadItem({
        url: info.url,
        filename: values.filename || info.filename,
      })
    } else {
      addDownloadItem(values)
    }
    setConfirmLoading(false)
    setIsOpen(false)
  }

  const afterOpenChange = (open: boolean) => {
    if (open) {
      urlInputRef.current?.focus()
    }
  }

  return (
    <Modal
      title="新建下载任务"
      okText="开始下载"
      cancelText="取消"
      centered
      open={isOpen}
      confirmLoading={confirmLoading}
      onOk={handleOk}
      onCancel={handleCancel}
      afterOpenChange={afterOpenChange}
    >
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item label="视频源" name="url" required>
          <Input ref={urlInputRef} />
        </Form.Item>
        <Form.Item label="文件名" name="filename">
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  )
}
