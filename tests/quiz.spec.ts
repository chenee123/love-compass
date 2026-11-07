import { test, expect } from '@playwright/test'

test.describe('恋爱坐标 - 端到端流程', () => {
  test('首页正常加载并展示品牌信息', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByText('恋爱坐标')).toBeVisible()
    await expect(page.getByText('你的婚恋市场定位')).toBeVisible()
    await expect(page.getByRole('button', { name: /开始测试/ })).toBeVisible()
  })

  test('点击开始进入答题页', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('button', { name: /开始测试/ }).click()
    await expect(page.getByText(/01\/20/)).toBeVisible()
  })

  test('未选择答案不能进入下一题', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('button', { name: /开始测试/ }).click()
    const next = page.getByRole('button', { name: /下一题/ })
    await expect(next).toBeDisabled()
  })

  test('上一题与下一题正常工作', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('button', { name: /开始测试/ }).click()
    await expect(page.getByText(/01\/20/)).toBeVisible()

    // 第一题选一个选项
    await page.locator('main button').first().click()
    const next = page.getByRole('button', { name: /下一题/ })
    await expect(next).toBeEnabled()
    await next.click()
    await expect(page.getByText(/02\/20/)).toBeVisible()

    // 上一题
    await page.getByRole('button', { name: /上一题/ }).click()
    await expect(page.getByText(/01\/20/)).toBeVisible()
  })

  test('完整作答 20 题并生成结果', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('button', { name: /开始测试/ }).click()

    for (let i = 0; i < 20; i++) {
      // 每道题选第一个选项
      await page.locator('main button').first().click()
      if (i < 19) {
        await page.getByRole('button', { name: /下一题/ }).click()
      } else {
        await page.getByRole('button', { name: /生成我的婚恋报告/ }).click()
      }
    }

    // 结果页
    await expect(page.getByText('你的婚恋定位是')).toBeVisible()
    await expect(page.getByText('五维能力画像')).toBeVisible()
    await expect(page.getByText('你的择偶偏好')).toBeVisible()
    await expect(page.getByText('你的个人优势')).toBeVisible()
    await expect(page.getByText('可能的择偶盲区')).toBeVisible()
    await expect(page.getByText('适配伴侣画像')).toBeVisible()
    await expect(page.getByText('给你的婚恋建议')).toBeVisible()
  })

  test('刷新后答题进度恢复', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('button', { name: /开始测试/ }).click()
    await page.locator('main button').first().click()
    await page.getByRole('button', { name: /下一题/ }).click()

    // 刷新
    await page.reload()
    // 首页应出现"继续上次未完成的测试"
    await expect(page.getByText(/继续上次未完成的测试/)).toBeVisible()
  })

  test('分享卡片生成按钮存在', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('button', { name: /开始测试/ }).click()
    for (let i = 0; i < 20; i++) {
      await page.locator('main button').first().click()
      if (i < 19) {
        await page.getByRole('button', { name: /下一题/ }).click()
      } else {
        await page.getByRole('button', { name: /生成我的婚恋报告/ }).click()
      }
    }
    await expect(
      page.getByRole('button', { name: /生成分享卡片/ }),
    ).toBeVisible()
    await expect(page.getByRole('button', { name: /重新测试/ })).toBeVisible()
  })

  test('重新测试清空旧结果并返回首页', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('button', { name: /开始测试/ }).click()
    for (let i = 0; i < 20; i++) {
      await page.locator('main button').first().click()
      if (i < 19) {
        await page.getByRole('button', { name: /下一题/ }).click()
      } else {
        await page.getByRole('button', { name: /生成我的婚恋报告/ }).click()
      }
    }
    await page.getByRole('button', { name: /重新测试/ }).click()
    await expect(page.getByRole('button', { name: /开始测试/ })).toBeVisible()
  })

  test('移动端无横向溢出', async ({ page }) => {
    await page.goto('/')
    const hasOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > window.innerWidth
    })
    expect(hasOverflow).toBe(false)
  })

  test('控制台无严重报错', async ({ page }) => {
    const errors: string[] = []
    page.on('pageerror', (err) => errors.push(err.message))
    page.on('console', (msg) => {
      if (msg.type() === 'error') errors.push(msg.text())
    })
    await page.goto('/')
    await page.getByRole('button', { name: /开始测试/ }).click()
    await page.waitForTimeout(500)
    expect(errors).toHaveLength(0)
  })
})
