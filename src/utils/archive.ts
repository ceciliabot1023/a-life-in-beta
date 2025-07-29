import fs from 'fs/promises'
import path from 'path'
import matter from 'gray-matter'

interface WeeklyMetrics {
  week: string
  income: number
  focusTime: number
  wellbeing: number
  energy: number
}

interface Finding {
  title: string
  category: string
  subcategory: string
  date: string
  content: string
}

export class WeeklyArchiver {
  private contentDir = path.join(process.cwd(), 'content')
  
  async archiveWeek(weekId: string) {
    try {
      // Get metrics for the week
      const metrics = await this.getWeeklyMetrics(weekId)
      
      // Get findings for the week
      const findings = await this.getWeeklyFindings(weekId)
      
      // Generate experiment file
      await this.generateExperimentFile(weekId, metrics, findings)
      
      console.log(`✅ Week ${weekId} archived successfully`)
    } catch (error) {
      console.error(`❌ Failed to archive week ${weekId}:`, error)
    }
  }
  
  private async getWeeklyMetrics(weekId: string): Promise<WeeklyMetrics | null> {
    try {
      const metricsPath = path.join(this.contentDir, 'metrics', `${weekId}.json`)
      const metricsData = await fs.readFile(metricsPath, 'utf-8')
      return JSON.parse(metricsData)
    } catch {
      console.warn(`No metrics found for week ${weekId}`)
      return null
    }
  }
  
  private async getWeeklyFindings(weekId: string): Promise<Finding[]> {
    const findings: Finding[] = []
    const findingsDir = path.join(this.contentDir, 'findings')
    
    try {
      const files = await fs.readdir(findingsDir, { recursive: true })
      
      for (const file of files) {
        if (typeof file === 'string' && file.endsWith('.md')) {
          const filePath = path.join(findingsDir, file)
          const content = await fs.readFile(filePath, 'utf-8')
          const { data, content: body } = matter(content)
          
          // Check if finding belongs to this week
          const findingDate = new Date(data.date)
          const weekStart = this.getWeekStart(weekId)
          const weekEnd = new Date(weekStart.getTime() + 7 * 24 * 60 * 60 * 1000)
          
          if (findingDate >= weekStart && findingDate < weekEnd) {
            findings.push({
              title: data.title,
              category: data.category,
              subcategory: data.subcategory,
              date: data.date,
              content: body
            })
          }
        }
      }
    } catch (error) {
      console.warn(`Error reading findings for week ${weekId}:`, error)
    }
    
    return findings
  }
  
  private async generateExperimentFile(weekId: string, metrics: WeeklyMetrics | null, findings: Finding[]) {
    const weekNumber = this.extractWeekNumber(weekId)
    
    const frontMatter = {
      title: `Week ${weekNumber}: Life Experiment Summary`,
      week: weekId,
      date: this.getWeekStart(weekId).toISOString(),
      status: 'completed'
    }
    
    let content = `# Week ${weekNumber}: Life Experiment Summary\n\n`
    
    // Add metrics section
    if (metrics) {
      content += `## 📊 Weekly Metrics\n\n`
      content += `| Metric | Value |\n`
      content += `|--------|-------|\n`
      content += `| Income | $${metrics.income.toLocaleString()} |\n`
      content += `| Focus Time | ${metrics.focusTime} hours |\n`
      content += `| Wellbeing | ${metrics.wellbeing}/10 |\n`
      content += `| Energy | ${metrics.energy}/10 |\n\n`
    }
    
    // Add findings sections
    if (findings.length > 0) {
      const workFindings = findings.filter(f => f.category === 'work')
      const lifeFindings = findings.filter(f => f.category === 'life')
      
      if (workFindings.length > 0) {
        content += `## 💼 Work Insights\n\n`
        workFindings.forEach(finding => {
          content += `### ${finding.title} (${finding.subcategory})\n\n`
          content += `${finding.content}\n\n`
        })
      }
      
      if (lifeFindings.length > 0) {
        content += `## 🌱 Life Insights\n\n`
        lifeFindings.forEach(finding => {
          content += `### ${finding.title} (${finding.subcategory})\n\n`
          content += `${finding.content}\n\n`
        })
      }
    }
    
    // Add reflection section
    content += `## 🤔 Weekly Reflection\n\n`
    content += `### What Worked Well\n`
    content += `- [Add your reflections here]\n\n`
    content += `### What Could Be Improved\n`
    content += `- [Add your reflections here]\n\n`
    content += `### Next Week's Focus\n`
    content += `- [Add your plans here]\n\n`
    
    // Generate final markdown
    const finalContent = matter.stringify(content, frontMatter)
    
    // Save to experiments folder
    const experimentsDir = path.join(this.contentDir, 'experiments')
    await fs.mkdir(experimentsDir, { recursive: true })
    
    const filePath = path.join(experimentsDir, `${weekId}.md`)
    await fs.writeFile(filePath, finalContent, 'utf-8')
  }
  
  private getWeekStart(weekId: string): Date {
    const [year, month, weekPart] = weekId.split('-')
    const weekNumber = parseInt(weekPart.replace('week-', ''))
    
    // Calculate the start of the specified week
    const yearStart = new Date(parseInt(year), parseInt(month) - 1, 1)
    const dayOfWeek = yearStart.getDay()
    const daysToFirstMonday = dayOfWeek === 0 ? 1 : 8 - dayOfWeek
    
    const firstMonday = new Date(yearStart.getTime() + daysToFirstMonday * 24 * 60 * 60 * 1000)
    return new Date(firstMonday.getTime() + (weekNumber - 1) * 7 * 24 * 60 * 60 * 1000)
  }
  
  private extractWeekNumber(weekId: string): number {
    const weekPart = weekId.split('-')[2]
    return parseInt(weekPart.replace('week-', ''))
  }
  
  async getCurrentWeek(): Promise<string> {
    const now = new Date()
    const year = now.getFullYear()
    const month = String(now.getMonth() + 1).padStart(2, '0')
    
    // Calculate week number within the month
    const firstDay = new Date(year, now.getMonth(), 1)
    const dayOfMonth = now.getDate()
    const weekNumber = Math.ceil((dayOfMonth + firstDay.getDay()) / 7)
    
    return `${year}-${month}-week-${weekNumber}`
  }
  
  async archiveCurrentWeek() {
    const currentWeek = await this.getCurrentWeek()
    await this.archiveWeek(currentWeek)
  }
}