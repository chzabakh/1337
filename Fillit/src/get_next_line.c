/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   get_next_line.c                                    :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: chzabakh <marvin@42.fr>                    +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/06/29 16:38:23 by chzabakh          #+#    #+#             */
/*   Updated: 2019/06/29 16:38:32 by chzabakh         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "get_next_line.h"

t_stock	*ft_create_new(t_stock *head, int fd)
{
	t_stock *new;
	t_stock *temp;

	temp = head;
	if (!(new = (t_stock *)malloc(sizeof(t_stock))))
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

t_stock	*ft_check_fd(int fd, t_stock *head)
{
	t_stock	*temp;

	temp = head;
	while (temp && temp->fd_id != fd)
		temp = temp->next;
	return (temp);
}

void	ft_read_till_newline(int fd, t_stock *temp)
{
	char	buf[BUFF_SIZE + 1];
	char	*storage;
	int		n;

	while ((n = read(fd, buf, BUFF_SIZE)) > 0)
	{
		buf[n] = '\0';
		storage = temp->content;
		temp->content = ft_strjoin(temp->content, buf);
		free(storage);
		if (ft_strchr(temp->content, '\n'))
			break ;
	}
}

void	ft_temporary(t_stock *temp, size_t check)
{
	char *sto;

	sto = temp->content;
	temp->content = ft_strdup(temp->content + check);
	free(sto);
}

int		get_next_line(const int fd, char **line)
{
	static t_stock	*head;
	t_va			v;

	v.tmp = head;
	v.check = 0;
	(!head) ? head = ft_create_new(head, fd) : head;
	if ((v.tmp = ft_check_fd(fd, head)) == NULL)
		v.tmp = ft_create_new(head, fd);
	if (((read(fd, v.buf, 0)) == -1) || fd < 0 || BUFF_SIZE < 1)
		return (-1);
	ft_read_till_newline(fd, v.tmp);
	while (v.tmp->content[v.check] != '\n' && v.tmp->content[v.check] != '\0')
		v.check++;
	if (v.tmp->content)
	{
		*line = ft_strsub(v.tmp->content, 0, v.check);
		v.check = (v.tmp->content[v.check] == '\n') ? v.check + 1 : v.check;
		ft_temporary(v.tmp, v.check);
		if (v.check > 0)
			return (1);
	}
	ft_strdel(line);
	free(v.tmp->content);
	free(v.tmp);
	return (0);
}
