const foo = `
[
  {
    name: 'amj',
    type: 'article',
    fields: [
      {
        type: 'set',
        max: 5,
        max_ending: ', et al',
        // if there's more than 5, discard the 6th onwards and put this
        separator: ', ',
        last_author_separator: ', &',
        end: ' ',
        fields: [
          {
            type: 'field',
            field: 'author',
            format: [
              'surname'
            ],
            end: ', '
          },
          {
            type: 'field',
            field: 'author',
            format: [
              'name',
              'initial'
            ],
            end: '.'
          }
        ]
      },
      {
        type: 'field',
        field: 'year',
        end: '. '
      },
      {
        type: 'field',
        field: 'title',
        end: '. '
      },
      {
        type: 'field',
        field: 'journal',
        end: ', ',
        format: [
          'bold',
          'italics'
        ]
      },
      {
        type: 'field',
        field: 'volume',
        end: ', '
      },
      {
        type: 'field',
        field: 'pages',
        separator: '-',
        end: '.'
      }
    ]
  },
  {
    name: 'asq',
    type: 'article',
    fields: [
      {
        type: 'set',
        max: 5,
        max_ending: ', et al',
        // if there's more than 5, discard the 6th onwards and put this
        separator: ', ',
        last_author_separator: ', and',
        end: ' \\n',
        format: [
          'bold'
        ],
        fields: [
          {
            type: 'field',
            field: 'author',
            format: [
              'surname'
            ],
            end: ', '
          },
          {
            type: 'field',
            field: 'author',
            format: [
              'name',
              'initial'
            ],
            end: '.'
          }
        ]
      },
      {
        type: 'table',
        columns: [
          {
            fields: [
              {
                type: 'field',
                field: 'year',
              }
            ]
          },
          {
            fields: [
              {
                type: 'field',
                field: 'title',
                end: '. '
              },
              {
                type: 'field',
                field: 'journal',
                end: ', ',
              },
              {
                type: 'field',
                field: 'volume',
                end: ', '
              },
              {
                type: 'field',
                field: 'pages',
                separator: '-',
                end: '.'
              }
            ]
          }
        ]
      }
    ]
  },
]
`
export default foo
