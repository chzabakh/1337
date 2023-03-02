/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   get_next_line.c                                    :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: chzabakh <marvin@42.fr>                    +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/04/26 17:57:15 by chzabakh          #+#    #+#             */
/*   Updated: 2019/05/03 20:57:11 by chzabakh         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "get_next_line.h"

t_carrier	*ft_create_new(t_carrier *head, int fd)
{
	t_carrier *new;
	t_carrier *temp;

	temp = head;
	if (!(new = (t_carrier *)malloc(sizeof(t_carrier))))
		return (NULL);
	new->fd_id = fd;
	new->content = ft_strnew(0);
	new->next = NULL;
	if (!head)
		return (new);
	while (temp->next)
		temp = temp->next;
	temp->next = new;
	return (new);
}

t_carrier	*ft_check_fd(int fd, t_carrier *head)
{
	t_carrier	*temp;

	temp = head;
	while (temp && temp->fd_id != fd)
		temp = temp->next;
	return (temp);
}

void		ft_read_till_newline(int fd, t_carrier *temp)
{
	char	buff[BUFF_SIZE + 1];
	char	*storage;
	int		rd;

	while ((rd = read(fd, buff, BUFF_SIZE)) > 0)
	{
		buff[rd] = '\0';
		storage = temp->content;
		temp->content = ft_strjoin(temp->content, buff);
		free(storage);
		if (ft_strchr(temp->content, '\n'))
			break ;
	}
}

void		ft_temporary(t_carrier *clone, size_t cursor)
{
	char *stock;

	stock = clone->content;
	clone->content = ft_strdup(clone->content + cursor);
	free(stock);
}

int			get_next_line(const int fd, char **line)
{
	static t_carrier	*head;
	t_carrier			*clone;
	int					i;
	char				buff[BUFF_SIZE + 1];

	clone = head;
	i = 0;
	(!head) ? head = ft_create_new(head, fd) : head;
	if ((clone = ft_check_fd(fd, head)) == NULL)
		clone = ft_create_new(head, fd);
	if (((read(fd, buff, 0)) == -1) || fd == -1 || BUFF_SIZE < 1)
		return (-1);
	ft_read_till_newline(fd, clone);
	while (clone->content[i] != '\n' && clone->content[i] != '\0')
		i++;
	if (clone->content)
	{
		*line = ft_strsub(clone->content, 0, i);
		i = (clone->content[i] == '\n') ? i + 1 : i;
		ft_temporary(clone, i);
		if (i > 0)
			return (1);
	}
	ft_strdel(line);
	return (0);
}
