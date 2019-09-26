import React from 'react'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

function Course(props) {
  const imgStyle = {
    height: 0,
    paddingTop: '56.25%'
  };
  return (
    <div>
      {
        props.course ? (
          <Card>
            <CardHeader title={props.course.fields.title} />
            <CardMedia
              style={imgStyle}
              image={props.course.fields.courseImage.fields.file.url}
              title={props.course.fields.title}
            />
            <CardContent>
              <Typography variant='body1'>
                {props.course.fields.description}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size='small' color='primary'
                href={props.course.fields.url}
                target='_blank'>
                Go to Course
              </Button>
            </CardActions>
          </Card>
        ) : null
      }
    </div>
  )
}

export default Course
