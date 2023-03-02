/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   open.c                                             :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: chzabakh <marvin@42.fr>                    +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/05/23 16:58:11 by chzabakh          #+#    #+#             */
/*   Updated: 2019/06/24 21:23:28 by chzabakh         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "fillit.h"

int		ft_open(char *argument)
{
	t_var3	v;
	t_sto	*head;
	int		dim;

	dim = 0;
	v.fd1 = open(argument, O_RDONLY);
	v.fd2 = open(argument, O_RDONLY);
	v.fd3 = open(argument, O_RDONLY);
	if (ft_file_storage(v.fd1) == 0)
		return (0);
	dim = ft_read2(v.fd2);
	if (dim == 0)
		return (0);
	head = ft_read3(v.fd3);
	if (head == NULL)
		return (0);
	ft_bt(head, dim);
	ft_lstrmv(&head);
	close(v.fd1);
	close(v.fd2);
	close(v.fd3);
	return (1);
}
